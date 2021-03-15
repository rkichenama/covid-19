import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing/registerRoute';
import { CacheFirst } from 'workbox-strategies/CacheFirst';
import { ExpirationPlugin } from 'workbox-expiration/ExpirationPlugin';

const manifest = (self as any).__WB_MANIFEST;
console.log('manifest', manifest)
precacheAndRoute(manifest);

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
    new CacheFirst({
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
