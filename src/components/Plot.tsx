// https://formidable.com/open-source/victory/guides/brush-and-zoom/
import React from 'react';
import { VictoryChart, VictoryZoomContainer, VictoryLine, VictoryBrushContainer, VictoryAxis } from 'victory';
import theme from '../data/victory-theme';

const Plot: React.FC<any> = () => {
  const [ state, setState ] = React.useState({} as any);
  const handleZoom = (domain) => {
    setState({...state, selectedDomain: domain});
  }
  const handleBrush = (domain) => {
    setState({...state, zoomDomain: domain});
  }

  return (
    <div>
      <VictoryChart {...{ theme }}
        width={550}
        height={300}
        scale={{ x: 'time', y: 'log' }}
        containerComponent={
          <VictoryZoomContainer {...{ theme }}
            responsive={false}
            zoomDimension="x"
            zoomDomain={state.zoomDomain}
            onZoomDomainChange={handleZoom}
          />
        }
      >
        <VictoryLine {...{ theme }}
          style={{
            data: { stroke: 'cyan' },
          }}
          data={[
            { x: new Date(1982, 1, 1), y: 125 },
            { x: new Date(1987, 1, 1), y: 257 },
            { x: new Date(1993, 1, 1), y: 345 },
            { x: new Date(1997, 1, 1), y: 515 },
            { x: new Date(2001, 1, 1), y: 132 },
            { x: new Date(2005, 1, 1), y: 305 },
            { x: new Date(2011, 1, 1), y: 270 },
            { x: new Date(2015, 1, 1), y: 470 },
          ]}
        />
      </VictoryChart>

      <VictoryChart {...{ theme }}
        width={550}
        height={90}
        scale={{ x: 'time', y: 'log' }}
        padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
        containerComponent={
          <VictoryBrushContainer {...{ theme }}
            responsive={false}
            brushDimension="x"
            brushDomain={state.selectedDomain}
            onBrushDomainChange={handleBrush}
          />
        }
      >
        <VictoryAxis {...{ theme }}
          tickValues={[
            new Date(1985, 1, 1),
            new Date(1990, 1, 1),
            new Date(1995, 1, 1),
            new Date(2000, 1, 1),
            new Date(2005, 1, 1),
            new Date(2010, 1, 1),
            new Date(2015, 1, 1),
          ]}
          tickFormat={(x) => new Date(x).getFullYear()}
        />
        <VictoryLine {...{ theme }}
          style={{
            data: { stroke: 'darkCyan' },
          }}
          data={[
            { x: new Date(1982, 1, 1), y: 125 },
            { x: new Date(1987, 1, 1), y: 257 },
            { x: new Date(1993, 1, 1), y: 345 },
            { x: new Date(1997, 1, 1), y: 515 },
            { x: new Date(2001, 1, 1), y: 132 },
            { x: new Date(2005, 1, 1), y: 305 },
            { x: new Date(2011, 1, 1), y: 270 },
            { x: new Date(2015, 1, 1), y: 470 },
          ]}
        />
      </VictoryChart>
    </div>
  );
};

export default Plot;
