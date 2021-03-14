import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { Workbox } from 'workbox-window';


const target = window.document.createElement('div');
// target.setAttribute('style', 'display: content')
target.style.display = 'contents';
window.document.body.appendChild(target);

render(<App />, target);

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


// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js').then(registration => {
//       console.log('SW registered: ', registration);
//     }).catch(registrationError => {
//       console.log('SW registration failed: ', registrationError);
//     });
//   });
// }
