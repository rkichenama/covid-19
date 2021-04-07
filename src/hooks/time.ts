import { useEffect } from 'react';

const multiplier = 1;
const tasks = window['_tasks'] = new Map<Symbol, { fn: Function, delay: number, countdown: number }>();
const execute = window['_executeTasks'] = (immediate = false) => {
  Array.from(tasks.values())
    .map(task => { (!immediate && (task.countdown--)); return task; })
    .filter(({ countdown }) => immediate || (0 >= countdown))
    .forEach(task => {
      task.fn();
      !immediate && (task.countdown = task.delay);
    });
}

window.setInterval(execute, 1000);

export const useInterval = (interval: number, fn: Function) => useEffect(() => {
  const sym = Symbol();
  tasks.set(sym, { fn, delay: interval * multiplier, countdown: 0 });
  return () => { tasks.has(sym) && tasks.delete(sym); };
}, [ interval, fn ]);
