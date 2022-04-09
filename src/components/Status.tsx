import React from 'react';
import Panel from './Panel';
import StateChooser from './StateChooser';
import { compactNumber, longDate } from '../data/transforms';
import { GlobalContext } from '../GlobalContext';

const Status: React.FC<{ x?: number, y?: number, w?: number, h?: number }> = ({ x, y, w, h }) => {
  const { hoveredDataPoints } = React.useContext(GlobalContext);

  return (
    <Panel {...{ x, y, w, h }} style={{
      height: '100%', overflow: 'hidden',
      ...(
        hoveredDataPoints.length
          ? { columnWidth: 'calc(96px * 1.8)' }
          : { display: 'flex', alignItems: 'center', justifyContent: 'center' }
      ),
    }}>
      {
        hoveredDataPoints.map(({ name, color, data: [ point ] }) => point?.x ? (
          <div key={`${name}${longDate(point.x)}`} style={{ color: color }}>
            { name }: <span style={{ fontFamily: 'Source Code Pro'}}>{ compactNumber(point.y) }</span>
          </div>
        ) : null)
      }
      {
        !hoveredDataPoints.length ? (
          <StateChooser />
        ) : null
      }
    </Panel>
  );
};

export default Status;
