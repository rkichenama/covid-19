import React from 'react';
import styled from 'styled-components';
import {} from 'styled-components/cssprop';
import debounce from 'lodash/debounce';

type Dimensions = { x: number, y: number, width: number, height: number };
export type Props = {
  className?: string,
  draw?: (context: CanvasRenderingContext2D, dimensions: Dimensions) => void,
  onMouseEnter?: (evt: React.MouseEvent<HTMLCanvasElement>, context: CanvasRenderingContext2D, dimensions: Dimensions) => void,
  onMouseMove?: (evt: React.MouseEvent<HTMLCanvasElement>, context: CanvasRenderingContext2D, dimensions: Dimensions) => void,
   onMouseLeave?: (evt: React.MouseEvent<HTMLCanvasElement>, context: CanvasRenderingContext2D, dimensions: Dimensions) => void,
  style?: any,
  id?: string
};

const Canvas: React.FC<Props> = ({
  id, className, draw,
  onMouseEnter, onMouseMove,  onMouseLeave
}) => {
  const [ dim, setDim ] = React.useState({ x: 0, y: 0, width: 0, height: 0 } as Dimensions);
  const canvas = React.useRef(undefined as HTMLCanvasElement);

  React.useEffect(() => {
    const { current } = canvas;
    if (!current || !draw) return;
    draw(current.getContext('2d'), dim);
  }, [ canvas.current, draw, dim ]);

  const resizeEffect = React.useCallback(() => {
    if (!canvas.current) return;
    const { x, y, width, height } = canvas.current.getBoundingClientRect();
      setDim({ x, y, width, height } as Dimensions);
  }, [ setDim ])

  React.useEffect(() => { // resize event
    const effect = debounce(resizeEffect, 200, {
      trailing: true, maxWait: 1000
    });
    window.addEventListener('resize', effect);
    effect();
    return () => {
      window.removeEventListener('resize', effect);
    };
  }, []);
  return (
    <canvas {...{
      id, className,
      onMouseEnter: (evt) => onMouseEnter(evt, canvas.current.getContext('2d'), dim),
      onMouseMove: (evt) => onMouseMove(evt, canvas.current.getContext('2d'), dim),
       onMouseLeave: (evt) =>  onMouseLeave(evt, canvas.current.getContext('2d'), dim),
      ref: canvas,
      width: dim.width, height: dim.height,
    }} />
  )
};

export default styled(Canvas)`
  width: 100%;
  height: 100%;

  ${props => props.style}
`;