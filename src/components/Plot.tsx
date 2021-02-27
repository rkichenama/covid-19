// https://formidable.com/open-source/victory/guides/brush-and-zoom/
import React from 'react';
import {
  VictoryChart,
  VictoryCursorContainer,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryZoomContainer,
  VictoryLine,
  VictoryBrushContainer,
  VictoryAxis,
  VictoryLegend,
  DomainTuple,
  InterpolationPropType,
  D3Scale
} from 'victory';
import { format as d3Format } from 'd3-format';
import theme, { baseProps } from '../data/victory-theme';
import CovidContext from '../data/context';
import { chartableDiseaseData, monthYear, shortDate, mediumDate } from '../data/transforms';
import { useContainerSize } from '../hooks/dom';
import { compareAsc, isWithinInterval, Interval } from 'date-fns'
import debounce from 'lodash/debounce';

import './Plot.scss';

interface PlotProps {
  datasets: DataSet[]
}

const Plot: React.FC<PlotProps> = ({
  datasets
}) => {
  const { logScale } = React.useContext(CovidContext);
  const ref = React.useRef(undefined as HTMLDivElement);
  const { width, height } = useContainerSize(ref);

  return (
    <div className='plot x1 y2 w12 h11' {...{ ref }}>
      {
        datasets.length && width && height ? (
          <>
            <VictoryChart {...{ theme }}
              width={width}
              height={height}
              scale={{ x: 'time', y: (logScale ? 'sqrt' : 'linear') }}
              domainPadding={{ x: [0, 0], y: [0, 96] }}
              padding={{ ...baseProps.padding, top: 0, left: 16, right: 16 }}
              containerComponent={
                <VictoryVoronoiContainer {...{ theme }}
                  // mouseFollowTooltips
                  labels={({ datum }) => `[${mediumDate(datum.x)}]: ${d3Format(',.0d')(datum.y)}`}
                  labelComponent={
                    <VictoryTooltip  {...{ theme }} constrainToVisibleArea />
                  }
                />

              }
            >
              <VictoryLegend {...{ theme }} /* x={125} y={10} */
                name='legend'
                orientation="horizontal"
                gutter={20}
                // style={{ border: { stroke: "black" }, title: {fontSize: 20 } }}
                data={datasets.map(({ name, color }) => ({ name, symbol: { fill: color }}))}
              />
              <VictoryAxis {...{ theme }}
                tickFormat={(x) => shortDate(x)}
                tickCount={5}
              />
              <VictoryAxis {...{ theme }} dependentAxis
                tickCount={6}
                tickFormat={d3Format(',~s')}
                offsetX={64}
              />
              {
                datasets.map(({ name, data, color }) => (
                  <VictoryLine key={name} {...{ theme, name }}
                    style={{
                      data: { stroke: color },
                    }}
                    data={data}
                    interpolation={'natural'}
                  />
                ))
              }
            </VictoryChart>
          </>
        ) : null
      }
    </div>
  );
};

export default Plot;
