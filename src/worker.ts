import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing/registerRoute';
import { NetworkFirst } from 'workbox-strategies/NetworkFirst';
import { ExpirationPlugin } from 'workbox-expiration/ExpirationPlugin';

precacheAndRoute((self as any).__WB_MANIFEST);

// workbox.precaching.precacheAndRoute(self.__precacheManifest);

addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    skipWaiting();
  }
});

[
  [/https\:\/\/disease.sh\/v3\/covid-19\//i, 'disease.sh'],
  [/https\:\/\/fonts.googleapis.com\//i, 'googleAssets'],
  [/https\:\/\/fonts.gstatic.com\//i, 'googleFonts']
].forEach(([ pathRegex, cacheName ]: [ RegExp, string ]) => {
  registerRoute(
    pathRegex,
    new NetworkFirst({
      cacheName,
      plugins: [
        new ExpirationPlugin({
          maxAgeSeconds: 60 * 60
        })
      ],
      matchOptions: {
        ignoreSearch: false
      }
    })
  );
});
