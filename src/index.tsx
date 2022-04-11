import React from 'react';
// import { render } from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
import GlobalContext from './GlobalContext';
import { Workbox } from 'workbox-window';


// const target = window.document.createElement('div');
// // target.setAttribute('style', 'display: content')
// target.style.display = 'contents';
// window.document.body.appendChild(target);

// render(<App />, target);

const container = window.document.createElement('main');
container.id = 'covid-19-app';
document.body.appendChild(container);
const element = (
  <React.StrictMode>
    <GlobalContext>
      <App />
    </GlobalContext>
  </React.StrictMode>
);
const root = createRoot(container);
root.render(element);
/*
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const wb = new Workbox('./service-worker.js');

    // Fires when the registered service worker has installed but is waiting to activate.
    wb.addEventListener('waiting', event => {
      const updateButton = document.createElement('button');
      updateButton.className = 'x11 y1 w2 h1 wait';
      updateButton.style.zIndex = '9999';
      updateButton.innerText = 'Update Service Worker';
      document.body.appendChild(updateButton);
      updateButton.addEventListener('click', () => {
        // Set up a listener that will reload the page as soon as the previously waiting service worker has taken control.
        wb.addEventListener('controlling', event => {
          window.location.reload();
        });

        // Send a message telling the service worker to skip waiting.
        // This will trigger the `controlling` event handler above.
        wb.messageSW({ type: 'SKIP_WAITING' });
      });
    });

    wb.register();
  });
}
*/
