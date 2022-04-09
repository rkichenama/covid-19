import React from 'react';
import Canvas from './Canvas';

import { differenceInDays, startOfMonth } from 'date-fns';
import { GlobalContext } from '../GlobalContext';

const USChart = ({ style, scaledY, scaledX, data }) => {
  const { fromBottom, fromLeft, isLogScale, maxRange, pandemicStart } = React.useContext(GlobalContext);
  const calcForHeightY = React.useCallback((height: number) => (
    scaledY(maxRange, height - fromBottom)
  ), [ scaledY, maxRange, fromBottom ]);
  return (
    <Canvas {...{
      draw: (ctx, { width, height }) => {
        ctx.clearRect(0, 0, width, height);
        const calcY = calcForHeightY(height);
        const calcX = scaledX(
          pandemicStart,
          differenceInDays(new Date(), startOfMonth(pandemicStart)) + 1,
          width - fromLeft
        );
        data.forEach(({ color, data, name }) => {
          if (!data.length) return;
          ctx.beginPath();
          ctx.strokeStyle = color;
          ctx.lineWidth = 1;

          ctx.moveTo(calcX(data[0].x) + fromLeft, calcY(data[0].y));
          for (let i = 1; i < data.length; i++) {
            ctx.lineTo(calcX(data[i].x) + fromLeft, calcY(data[i].y));
          }

          ctx.stroke();
          ctx.closePath();
        });
      },
      style
    }} />
  );
}

export default USChart;
