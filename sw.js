/* Mannismann Pipe v2.7 — service worker (offline cache, same-origin only) */
var V="mp-2.7",A=["./","index.html","manifest.webmanifest","icons/icon-192.png","icons/icon-512.png","icons/icon-180.png","icons/maskable-512.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(A)}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){
 var r=e.request;
 if(r.method!=="GET"||new URL(r.url).origin!==self.location.origin)return;
 if(r.mode==="navigate"){
  e.respondWith(fetch(r).then(function(n){var cp=n.clone();if(n.ok)caches.open(V).then(function(c){c.put("index.html",cp)});return n}).catch(function(){return caches.match("index.html")}));
  return}
 e.respondWith(caches.match(r).then(function(h){return h||fetch(r).then(function(n){var cp=n.clone();if(n.ok)caches.open(V).then(function(c){c.put(r,cp)});return n})}));
});
