/* eslint-disable no-restricted-globals */

import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate, CacheFirst } from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";

clientsClaim();
self.skipWaiting();

// Precarga de archivos generados (build)
precacheAndRoute(self.__WB_MANIFEST);

// Google Fonts (hojas de estilo)
registerRoute(
  ({ url }) => url.origin === "https://fonts.googleapis.com",
  new StaleWhileRevalidate({
    cacheName: "google-fonts-stylesheets",
  })
);

// Google Fonts (archivos de fuente)
registerRoute(
  ({ url }) => url.origin === "https://fonts.gstatic.com",
  new CacheFirst({
    cacheName: "google-fonts-webfonts",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

// API de productos
registerRoute(
  ({ url }) =>
    url.origin === "https://backend-api-xeven-sensual.vercel.app" &&
    url.pathname.startsWith("/api/v1"),
  new StaleWhileRevalidate({
    cacheName: "api-productos",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({ maxEntries: 10 }),
    ],
  })
);

// Imágenes (con StaleWhileRevalidate para evitar cacheos corruptos)
registerRoute(
  ({ request }) => request.destination === "image",
  new StaleWhileRevalidate({
    cacheName: "images",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
      }),
    ],
  })
);

// Archivos JS y CSS
registerRoute(
  ({ request }) =>
    request.destination === "script" || request.destination === "style",
  new StaleWhileRevalidate({
    cacheName: "static-resources",
  })
);

// Página de inicio
registerRoute(
  ({ url }) => url.pathname === "/",
  new StaleWhileRevalidate({
    cacheName: "home-page-cache",
  })
);
