// coi-serviceworker — enables SharedArrayBuffer by injecting COOP/COEP headers
// Source: https://github.com/nickswalker/coi-serviceworker (MIT)
// Required for biowasm/Aioli to run minimap2 in the browser.

if (typeof window === 'undefined') {
  // Service Worker scope
  self.addEventListener('install', () => self.skipWaiting());
  self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
  self.addEventListener('fetch', (e) => {
    if (e.request.cache === 'only-if-cached' && e.request.mode !== 'same-origin') return;

    // Don't intercept non-same-origin requests — let them pass through
    // This avoids COEP blocking cross-origin API calls and chunk fetches
    if (e.request.method !== 'GET' && e.request.method !== 'HEAD') return;
    const url = new URL(e.request.url);
    if (url.origin !== self.location.origin) return;

    e.respondWith(
      fetch(e.request).then((r) => {
        if (r.status === 0) return r;
        const headers = new Headers(r.headers);
        headers.set('Cross-Origin-Embedder-Policy', 'credentialless');
        headers.set('Cross-Origin-Opener-Policy', 'same-origin');
        return new Response(r.body, { status: r.status, statusText: r.statusText, headers });
      }).catch(() => new Response('Service Worker fetch failed', { status: 500 }))
    );
  });
} else {
  // Window scope — register the service worker
  (async () => {
    if (window.crossOriginIsolated) return; // already isolated

    const reg = await navigator.serviceWorker?.register(window.document.currentScript.src, {
      scope: '/',
    });

    if (reg?.installing || reg?.waiting) {
      // New worker installed — need page reload to activate
      const worker = reg.installing || reg.waiting;
      worker.addEventListener('statechange', () => {
        if (worker.state === 'activated') {
          console.log('[coi] Cross-origin isolation enabled via Service Worker. Reloading...');
          window.location.reload();
        }
      });
    }
  })();
}
