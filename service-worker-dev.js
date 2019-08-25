const RUNTIME = 'runtime';
let CURRENT_CACHES = [RUNTIME];
const RUNTIME_ORIGINS = [
  'https://maxcdn.bootstrapcdn.com'
];
const NO_CACHE_ORIGINS = [
  'https://api.mlab.com',
  'https://artbased.com',
  'https://johntom.github.io'

];
//'https://gtztest.com'
// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !CURRENT_CACHES.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// The fetch handler serves responses for all resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
  let CACHE_NAME = RUNTIME;
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return caches.open(CACHE_NAME).then(cache => {
				if (reqUrl.startsWith('https://johntom.github.io') && event.request.method === 'GET') {
					const cacheTime = Date.now();
					const reqUrl = new URL(`${event.request.url}?version='${cacheTime}'`);
					const request = new Request(reqUrl, {method: 'GET'});
					return fetch(request).then(response => {
						if (event.request.method === 'GET' &&
							!NO_CACHE_ORIGINS.includes(reqUrl.origin)) {
							console.log('sw:caching (', CACHE_NAME, ') - ', event.request.url);
							// Put a copy of the response in the runtime cache.
							return cache.put(event.request, response.clone()).then(() => {
								return response;
							});
						} else {
							return response;
						}
					});
				} else {
					return fetch(event.request).then(response => {
						const reqUrl = new URL(event.request.url);
						if (event.request.method === 'GET' &&
							!NO_CACHE_ORIGINS.includes(reqUrl.origin)) {

							console.log('sw:caching (', CACHE_NAME, ') - ', event.request.url);
							// Put a copy of the response in the runtime cache.
							return cache.put(event.request, response.clone()).then(() => {
								return response;
							});
						} else {
							return response;
						}
					});
				}
      });
    })
  );
});
