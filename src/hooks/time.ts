import { useEffect } from 'react';

const tasks = new Map<Symbol, { fn: Function, delay: number, countdown: number }>();

window.setInterval(() => {
  Array.from(tasks.values())
    .map(task => { task.countdown--; return task; })
    .filter(({ countdown }) => 0 >= countdown)
    .forEach(task => {
      task.fn();
      task.countdown = task.delay;
    });
}, 1000);

export const useInterval = (interval: number, fn: Function) => useEffect(() => {
  const sym = Symbol();
  tasks.set(sym, { fn, delay: interval, countdown: 0 });
  return () => { tasks.has(sym) && tasks.delete(sym); };
}, [ interval, fn ]);
