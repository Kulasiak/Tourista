/* Tourista — il pezzo che fa funzionare il gestionale anche senza linea.
   Tiene una copia dei file in cache: al primo giro li scarica, poi li serve
   da lì e intanto va a vedere se in rete ce n'è una versione più nuova. */
const CACHE = "tourista-v1";
const FILE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;   /* i caratteri esterni fanno da soli */

  e.respondWith(
    caches.match(req).then(hit => {
      const rete = fetch(req).then(res => {
        if (res && res.status === 200) {
          const copia = res.clone();
          caches.open(CACHE).then(c => c.put(req, copia));
        }
        return res;
      }).catch(() => hit);
      return hit || rete;
    })
  );
});
