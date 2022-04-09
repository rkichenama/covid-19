import React from 'react';
import Panel from './Panel';
import Radios from './Radios';
import Checkboxes from './Checkboxes';
import Canvas from './Canvas';
import USChart from './USChart';
import flatten from 'lodash/flatten';
import { useNytUSHistoryChart, useNytHistoryChartByStates } from '../hooks/diseases.sh';
import {
  differenceInMonths, differenceInDays,
  addDays, addMonths, addYears,
  startOfDay, startOfMonth, startOfYear,
  endOfMonth, endOfYear,
  isEqual,
  min as minDate
} from 'date-fns';
import orderBy from 'lodash/orderBy';
import { compactNumber, formattedNumber, longDate } from '../data/transforms';
import { GlobalContext } from '../GlobalContext';

const sum = (seed: number) => (total: number, { y }: ChartableData, i: number, list: ChartableData[]) => (
  total + Math.max(0, i ? (y - list[i - 1].y) : y - seed)
) as number;
const lastNAvg = (n: number) => (list: ChartableData[], from: number) => {
  const [ { y: seed }, ...items ] = list.slice(from - n - 1, from);
  return items.reduce(sum(seed), 0) / n;
};
const transformAsDeltas = (deltas: boolean, sets: DataSet[]) => {
  if (!deltas) return sets;
  const n = 7;
  const lastAvg = lastNAvg(n);
  return sets.map(({ data, ...rest }) => ({
    ...rest,
    data: data.map((point, i, list) => {
      if (i <= n) { return point; }
      const y = lastAvg(list, i);
      return { ...point, y };
    })
  }) )
};
const scaledY = (isLogScale: boolean) => {
  return (maxRange: number, height: number) => (value: number) => {
    return (
      isLogScale
        ? height * (1 - Math.max(0, (Math.log10(value) / Math.log10(maxRange))))
        : height * (1 - (value / maxRange))
    );
  }
};
const descaledY = (isLogScale: boolean) => {
  return (maxRange: number, height: number) => (value: number) => {
    return (
      isLogScale
        ? Math.pow(10, (height - value) * (Math.log10(maxRange) / height))
        : (height - value) * (maxRange / height)
    );
  }
};
const scaledX = (pandemicStart: Date, maxRange: number, width: number) => (value: Date) => (
  width *  ((
    differenceInDays(value, startOfMonth(pandemicStart))
  ) / maxRange)
);
const descaledX = (pandemicStart: Date, maxRange: number, width: number) => (value: number) => (
  addDays(
    startOfMonth(pandemicStart),
    Math.floor(maxRange * (value / width))
  )
);

type HasZIndex = {
  zIndex: string
}

const XAxis: React.FC<HasZIndex> = ({ zIndex }) => {
  const { pandemicStart, fromLeft, fromBottom, months, chartMetaColor, textInChartFont } = React.useContext(GlobalContext);

  return (
    <Canvas {...{
      draw: (ctx, { width, height }) => {
        ctx.clearRect(0, 0, width, height);
        // horizontal axis
        let currentPandemicMonth = startOfMonth(pandemicStart);
        const today = new Date();
        const deriveX = scaledX(pandemicStart, differenceInDays(new Date(), startOfMonth(pandemicStart)), width - fromLeft);
        let j = 0;
        while (currentPandemicMonth < today) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(0, 0, 0, ${j % 2 ? 0.6 : 0.2})`;
          let start = deriveX(currentPandemicMonth) + fromLeft;
          const size = deriveX(endOfMonth(currentPandemicMonth)) - start;
          ctx.fillRect(
            start, 0,
            size, height
          );
          ctx.closePath();

          ctx.beginPath();
          ctx.fillStyle = chartMetaColor;
          ctx.font = textInChartFont;
          ctx.textAlign = 'center';
          ctx.fillText(
            months[(j % months.length)],
            start + (size / 2),
            height - fromBottom + 12);
          ctx.closePath();

          currentPandemicMonth = addMonths(currentPandemicMonth, 1);
          j++;
        }
        let currentPandemicYear = startOfYear(pandemicStart);
        j = 0;
        while (currentPandemicYear < today) {
          ctx.beginPath();
          let start = deriveX(currentPandemicYear) + fromLeft;
          const endDate = endOfYear(currentPandemicYear);
          const size = deriveX(
            minDate([ today, endOfYear(currentPandemicYear) ])
          ) - start;
          ctx.fillStyle = chartMetaColor;
          ctx.font = textInChartFont;
          ctx.textAlign = 'center';
          ctx.fillText(
            `${pandemicStart.getFullYear() + j}`,
            start + (size / 2),
            height - fromBottom + 16 + 12);
          ctx.closePath();

          currentPandemicYear = addYears(currentPandemicYear, 1);
          j++;
        }
      },
      style: {
        position: 'absolute',
        top: '0', left: '0',
        'z-index': zIndex
      }
    }} />
  );
};
const YAxis: React.FC<HasZIndex> = ({ zIndex }) => {
  const { isLogScale, fromLeft, fromBottom, maxRange, chartMetaColor, textInChartFont } = React.useContext(GlobalContext);

  return (
    <Canvas {...{
      draw: (ctx, { width, height }) => {
        ctx.clearRect(0, 0, width, height);
        // vertical axis
        const calcLinear = scaledY(isLogScale)(maxRange, height - fromBottom);
        const verticalDivisions = 10;

        const mark = (value: number) => {
          const zero = calcLinear(value);
          ctx.beginPath();
          ctx.strokeStyle = chartMetaColor;
          ctx.lineWidth = 0.5;
          ctx.moveTo(fromLeft, zero);
          ctx.lineTo(width, zero);
          ctx.stroke();
          ctx.closePath();

          ctx.beginPath();
          ctx.fillStyle = chartMetaColor;
          ctx.font = textInChartFont;
          ctx.textAlign = 'left';
          ctx.fillText(
            `${compactNumber(Math.round(value))}`,
            fromLeft, zero + 12
          );
          ctx.closePath();
          ctx.beginPath();
          ctx.fillStyle = chartMetaColor;
          ctx.font = textInChartFont;
          ctx.textAlign = 'right';
          ctx.fillText(
            `${compactNumber(Math.round(value))}`,
            width, zero + 12
          );
          ctx.closePath();
        };
        mark(0);
        if (isLogScale) {
          const m = Math.ceil(Math.log10(maxRange));
          for (let h = 1; h <= m; h++) {
            mark(Math.pow(10, h));
          }
        } else {
          mark(maxRange);
          for (let h = 1; h < verticalDivisions; h++) {
            mark(maxRange * (h / verticalDivisions));
          }
        }
      },
      style: {
        position: 'absolute',
        top: '0', left: '0',
        'z-index': zIndex
      }
    }} />
  );
};
const MouseLayer: React.FC<HasZIndex> = ({ zIndex }) => {
  const { fromBottom, fromLeft, isLogScale, maxRange, pandemicStart, hoverValue, update } = React.useContext(GlobalContext);

  return (
    <Canvas {...{
      onMouseEnter: (_, ctx, { width, height }) => {
        ctx.clearRect(0, 0, width, height);
        update({ hoverValue: { ...hoverValue, date: undefined } });
      },
      onMouseLeave: (_, ctx, { width, height }) => {
        ctx.clearRect(0, 0, width, height);
        update({ hoverValue: { ...hoverValue, date: undefined } });
      },
      onMouseMove: (evt, ctx, { width, height, y: offsetY }) => {
        ctx.clearRect(0, 0, width, height);
        const x = evt.clientX;
        const y = evt.clientY - offsetY;

        if (y > (height - fromBottom) || x < fromLeft) return;
        // horizontal
        ctx.beginPath();
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 0.5;
        ctx.moveTo(fromLeft, y);
        ctx.lineTo(width, y);
        ctx.stroke();
        ctx.closePath();

        // vertical
        ctx.beginPath();
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 0.5;
        ctx.moveTo(x, height - fromBottom);
        ctx.lineTo(x, 0);
        ctx.stroke();
        ctx.closePath();

        update({
          hoverValue: {
            date: descaledX(pandemicStart, differenceInDays(new Date(), startOfMonth(pandemicStart)), width - fromLeft)(x + fromLeft),
            value: descaledY(isLogScale)(maxRange, height - fromBottom)(y)
          }
        });
      },
      style: {
        position: 'absolute',
        top: '0', left: '0',
        'z-index': zIndex,
        cursor: 'crosshair'
      }
    }} />
  );
};

const UnionPlot: React.FC<HasZIndex & { US: any }> = ({ zIndex, US }) => {
  const { isLogScale, includeUS } = React.useContext(GlobalContext);

  return includeUS && US.loaded ? (
    <USChart {...{
      scaledX,
      data: US.data,
      scaledY: scaledY(isLogScale),
      style: {
        position: 'absolute',
        top: '0', left: '0',
        'z-index': zIndex
      }
    }} />
  ) : null;
};

const StatesPlot: React.FC<HasZIndex & { States: any }> = ({ zIndex, States }) => {
  const { isLogScale } = React.useContext(GlobalContext);

  return States.loaded ? (
    <USChart {...{
      scaledX,
      data: States.datasets,
      scaledY: scaledY(isLogScale),
      style: {
        position: 'absolute',
        top: '0', left: '0',
        'z-index': zIndex
      }
    }} />
  ) : null;
};


const useUsDataWithTransform = (dataType: ('cases' | 'deaths'), isRelative: boolean = false) => {
  const { data = [], error, loaded, loading } = useNytUSHistoryChart(dataType);
  return {
    error, loaded, loading,
    data: transformAsDeltas(isRelative, data)
  }
};
const useStateDataWithTransform = (states: string[], dataType: ('cases' | 'deaths'), isRelative: boolean = false) => {
  const { datasets = [], error, loaded, loading } = useNytHistoryChartByStates(states, dataType);
  return {
    error, loaded, loading,
    datasets: transformAsDeltas(isRelative, datasets)
  }
};
const ChartLayers = () => {
  const { chartVerticalPadding, includeUS, dataType, isRelative, selectedStates, update, hoverValue } = React.useContext(GlobalContext);

  const US = useUsDataWithTransform(dataType, isRelative);
  const States = useStateDataWithTransform(selectedStates, dataType, isRelative);

  React.useEffect(() => {
    let newMax = 0;
    if (includeUS && US.loaded && US.data.length) {
      newMax = Math.max(
        newMax,
        Math.max.apply(
          Math,
         US.data[0].data.map(({ y }) => y)
        )
      );
    }
    if (States.loaded && States.datasets.length && States.datasets.every(set => set.data.length)) {
      newMax = Math.max(
        newMax,
        Math.max.apply(
          Math,
          flatten(
            States.datasets.map(({ data }) => data)
          )
            .map(({ y }) => y)
        )
      );
    }

    update({ maxRange: Math.round(newMax * chartVerticalPadding) });
  }, [ US.data, US.loaded, States.datasets, States.loaded, includeUS, isRelative ]);
  React.useEffect(() => {
    let hoveredDataPoints: DataSet[] = [];

    if (!hoverValue.date) {
      update({ hoveredDataPoints });
      return;
    }

    if (includeUS && US.loaded && US.data[0].data.length) {
      hoveredDataPoints.push({
        ...US.data[0],
        data: US.data[0].data.filter(({ x }) => (
          isEqual(startOfDay(x), startOfDay(hoverValue.date))
        ))
      });
    }
    if (States.loaded) {
      hoveredDataPoints.push.apply(hoveredDataPoints,
        States.datasets.map(dataset => ({
          ...dataset,
          data: dataset.data.filter(({ x }) => (
            isEqual(startOfDay(x), startOfDay(hoverValue.date))
          ))
        }))
      )
    }

    hoveredDataPoints = orderBy(
      hoveredDataPoints,
      [
        ({ data }) => Math.max.apply(Math, data.map(({ y }) => y)),
        ({ name }) => name.toLowerCase()
      ],
      [ 'desc', 'asc' ]
    );
    update({ hoveredDataPoints });
  }, [ US.data, US.loaded, States.datasets, States.loaded, includeUS, hoverValue, update ]);

  return (
    <>
      <XAxis zIndex='10' />
      <YAxis zIndex='11' />
      <UnionPlot zIndex='20' {...{ US }} />
      <StatesPlot zIndex='30' {...{ States }} />
      <MouseLayer zIndex='100' />
    </>
  );
};

export default ChartLayers;
