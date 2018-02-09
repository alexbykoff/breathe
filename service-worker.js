const PRECACHE = 'breathe-v1.0.0';

const PRECACHE_URLS = [
    './',
    './css/main.css',
    './audio/Raindrops-noise.mp3',
    './js/main.js',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(PRECACHE)
            .then(cache => cache.addAll(PRECACHE_URLS))
            .then(self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    const currentCaches = [PRECACHE];

    event.waitUntil(
        caches.keys()
            .then(cacheNames =>
                cacheNames.filter(cacheName => !currentCaches.includes(cacheName)))
            .then(cachesToDelete =>
                Promise.all(cachesToDelete.map(cacheToDelete =>
                    caches.delete(cacheToDelete)
                )))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) return response;
            const fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(response => {
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }

                const responseToCache = response.clone();
                caches.open(PRECACHE).then(cache =>
                    cache.put(event.request, responseToCache)
                );

              return response;
            });
        })
    );
});
