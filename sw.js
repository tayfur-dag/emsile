const AD="emsile-v8";
const DOSYALAR=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>{
  e.waitUntil(caches.open(AD).then(c=>c.addAll(DOSYALAR)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",e=>{
  e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==AD).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{
    const kopya=r.clone();
    caches.open(AD).then(ch=>ch.put(e.request,kopya)).catch(()=>{});
    return r;
  }).catch(()=>caches.match("./index.html"))));
});
