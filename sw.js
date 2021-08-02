self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open('formalapp').then(function(cache) {
        return cache.addAll([
          "https://notableapp.github.io/Formal-stack-pdfs/index.html",
          "https://notableapp.github.io/Formal-stack-pdfs/",
          "create.js",
          "desktop.css",
          "index.html",
          "style.css",
          "ui.js",
          "assets/",
          "assets/done_black_24dp.svg",
          "assets/favicon.png",
          "assests/ico@512.png",
          "assests/ico@192.png",
          "assets/img_add.svg",
          "assets/watermark.png",
          "assets/watermark64",
          "libs/",
          "libs/cropper.min.js",
          "libs/cropper.min.css",
          "libs/Google-mt-fonts.woff2",
          "libs/jspdf.umd.min.js",
          "libs/material.min (1).css",
          "libs/material.min.js",
          "libs/TeDlert.css",
          "libs/TeDlertmain.js",
          "pages/create.html",
          "pages/settings.html"
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
