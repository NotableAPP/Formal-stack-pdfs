self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open('fs_bst_pdf').then(function(cache) {
        return cache.addAll([
          // add app with domain
          "/index.html?appstatus=active",
          "assets/done_black_24dp.svg",
          "assets/favicon.png",
          "assets/ico@192.png",
          "assets/img_add.svg",
          "assets/watermark.png",
          "assets/watermark64",
          "/docs/index.html",
          "/APP/libs/cropper.min.css",
          "/APP/libs/cropper.min.js",
          "/APP/libs/Google-mt-fonts.woff2",
          "/APP/libs/jspdf.umd.min.js",
          "/APP/libs/material.min (1).css",
          "/APP/libs/material.min.js",
          "/APP/libs/TeDlert.css",
          "/APP/libs/TeDlertmain.js",
          "/APP/pages/create.html",
          "/APP/pages/settings.html",
          "/APP/create.js",
          "/APP/desktop.css",
          "/APP/style.css",
          "/APP/ui.js"
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
