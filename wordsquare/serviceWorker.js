const staticWordSquare = "dev-coffee-site-v1"
const assets = [
  "/",
  "/index.html",
  "/wordsquare.css",
  "/words.js",
  "/board.js",
  "/squares.js"
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticWordSquare).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})
