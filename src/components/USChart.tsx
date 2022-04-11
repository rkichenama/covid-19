import { camelize } from 'humps';
import React from 'react';
import Canvas from './Canvas';

import { differenceInDays, startOfMonth } from 'date-fns';
import { GlobalContext } from '../GlobalContext';

type Props = {
  style?: any,
  scaledY: (maxRange: number, height: number) => (value: number) => number,
  scaledX: (pandemicStart: Date, maxRange: number, width: number) => (value: Date) => number,
  data: DataSet
}

const USChart: React.FC<Props> = ({ style, scaledY, scaledX, data }) => {
  const { fromBottom, fromLeft, maxRange, pandemicStart, lineWidthMain } = React.useContext(GlobalContext);
  const calcForHeightY = React.useCallback((height: number) => (
    scaledY(maxRange, height - fromBottom)
  ), [ scaledY, maxRange, fromBottom ]);
  return (
    <Canvas {...{
      id: data?.name ? camelize(data.name) : undefined,
      draw: (ctx, { width, height }) => {
        ctx.clearRect(0, 0, width, height);
        const calcY = calcForHeightY(height);
        const calcX = scaledX(
          pandemicStart,
          differenceInDays(new Date(), startOfMonth(pandemicStart)) + 1,
          width - fromLeft
        );

        if (!data.data.length) return;
        ctx.beginPath();
        ctx.strokeStyle = data.color;
        ctx.lineWidth = lineWidthMain;

        ctx.moveTo(calcX(data.data[0].x) + fromLeft, calcY(data.data[0].y));
        for (let i = 1; i < data.data.length; i++) {
          ctx.lineTo(calcX(data.data[i].x) + fromLeft, calcY(data.data[i].y));
        }

        ctx.stroke();
        ctx.closePath();
      },
      style
    }} />
  );
}

export default USChart;
