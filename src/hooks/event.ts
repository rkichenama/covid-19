import { useRef, useEffect } from 'react';

type EventHandler = (event: Event) => void;

export const useEventListener = (eventName: string, handler: EventHandler, element: Window | Document | HTMLElement = window) => {
  const savedHandler = useRef<EventHandler>(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [ handler ]);

  useEffect(
    () => {
      const isSupported = element && element.addEventListener;

      if (!isSupported) { return () => {}; }

      const eventListener = event => savedHandler.current(event);
      element.addEventListener(eventName, eventListener);

      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [ eventName, element ]
  );
};
