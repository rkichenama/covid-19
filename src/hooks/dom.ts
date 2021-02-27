import { useState, useLayoutEffect, RefObject } from 'react';

export const useContainerSize = (ref: RefObject<HTMLElement>) => {
  const [ { x, y, width, height }, setSize ] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useLayoutEffect(() => {
    let listener;
    if (ref?.current) {
      setSize(ref.current.getBoundingClientRect());
      listener = () => {
        setSize(ref.current.getBoundingClientRect());
      };
      window.addEventListener('resize', listener);
    }
    return () => {
      if (listener) {
        window.removeEventListener('resize', listener);
      }
    }
  }, [ ref?.current ]);

  return { x, y, width, height }
};