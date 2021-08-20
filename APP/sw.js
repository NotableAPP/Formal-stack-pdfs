self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open('fs_bst_pdf_vone').then(function(cache) {
        return cache.addAll([
          "https://formal-stack.netlify.app/APP/",
          "index.html"
        ]);
      })
    );
});  
self.addEventListener('fetch', function(e) {
     console.log(e.request.url);
     e.respondWith(
       caches.match(e.request).then(function(response) {
         return response || fetch(e.request);
       })
     );
  });
