self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open('fs_bst_pdf_vonepointtwo').then(function(cache) {
        return cache.addAll([
          "https://formal-stack.netlify.app/app/",
          "index.html",
          "assets/done_black_24dp.svg",
          "assets/favicon.png",
          "assets/ico@192.png",
          "assets/img_add.svg",
          "libs/cropper.min.css",
          "libs/cropper.min.js",
          "libs/Google-mt-fonts.woff2",
          "libs/jspdf.umd.min.js",
          "libs/material.min (1).css",
          "libs/material.min.js",
          "libs/TeDlert.css",
          "libs/TeDlertmain.js",
          "desktop.css",
          "style.css",
          "ui.js",
          "create.js",
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
