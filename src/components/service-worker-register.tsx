'use client';

import { useEffect } from 'react';

/** Registers the service worker in production. Mount once in the root layout. */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // registration failure is non-fatal; the app still works online
      });
    }
  }, []);
  return null;
}
