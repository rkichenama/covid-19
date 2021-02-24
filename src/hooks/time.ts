import { useState, useEffect } from 'react';

export const useInterval = (delay: number) => {
  const [ triggered, trigger ] = useState(0);

  useEffect(() => {
    let interval = 0;
    if (delay) {
      interval = window.setInterval(() => {
        trigger(triggered + 1);
      }, delay * 1000);
    }
    return () => {
      if (interval) {
        window.clearInterval(interval);
      }
    };
  }, [ delay ]);
  return triggered;
};
