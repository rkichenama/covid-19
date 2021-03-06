// https://formidable.com/open-source/victory/guides/brush-and-zoom/
import React from 'react';
import { render } from 'react-dom';
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
import { chartableDiseaseData, monthYear, shortDate, mediumDate, asDate } from '../data/transforms';
import { useContainerSize } from '../hooks/dom';
import { compareAsc, isWithinInterval, Interval } from 'date-fns'
import debounce from 'lodash/debounce';

import './Plot.scss';

const portal = (date, desc) => {
  render(
    <div style={{ fontSize: '0.8em' }}>
      [{ shortDate(date) }]:{' '}
      { desc }
    </div>,
    document.getElementById('portal')
  );
  // document.getElementById('portal').innerHTML = `
  //   ${}: $
  // `;
};

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
                  labels={({ datum }) => {
                    const lbl = mediumDate(datum.x);
                    if (lbl === 'Invalid Date') {
                      return null;
                    } else {
                      return `[${mediumDate(datum.x)}]: ${d3Format(',.0d')(datum.y)}`
                    }
                  }}
                  labelComponent={
                    <VictoryTooltip  {...{ theme }} constrainToVisibleArea />
                  }
                />

              }
            >
              <VictoryLegend {...{ theme }} x={96} /* y={10} */
                style={{
                  data: { stroke: 'white' },
                  border: { stroke: 'white' }
                }}
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
                Object.entries(importantDates).map(([ date, desc ]) => {
                  const day = asDate(date);
                  return (
                    <VictoryLine key={date}
                      samples={2}
                      x={() => day}
                      style={{ data: { stroke: 'rgba(255, 0, 0, 0.5)', strokeWidth: '2px' } }}
                      events={[{
                        target: 'data',
                        eventHandlers: {
                          // onClick: () => {
                          // },
                          onMouseEnter: () => {
                            portal(date, desc);
                            return [];                          
                          },
                          // onMouseLeave: () => {
                          // },
                        }
                      }]}
                    />
                  );
                })
              }
              {
                datasets.map(({ name, data, color }) => (
                  <VictoryLine key={name} {...{ theme, name }}
                    style={{
                      data: { stroke: color },
                    }}
                    data={data}
                    interpolation={'monotoneX'}
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
