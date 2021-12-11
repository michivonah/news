const workerCache = "news-michivonah-ch-v2"
const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/script.css",
  "/manifest.json",
  "/icons/logo-dark-1080.png",
  "/icons/logo-dark-720.png",
  "/icons/logo-dark-512.png",
  "/icons/logo-dark-256.png",
  "/icons/logo-dark-128.png",
  "/icons/logo-dark-92.png",
  "/icons/logo-green-1080.png",
  "/icons/logo-green-720.png",
  "/icons/logo-green-512.png",
  "/icons/logo-green-256.png",
  "/icons/logo-green-128.png",
  "/icons/logo-gree -92.png",
  "/icons/logo-dark-transparent-1080.png",
  "/icons/logo-green-transparent-1080.png",
  "https://unpkg.com/aos@2.3.1/dist/aos.css",
  "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js",
  "https://unpkg.com/akar-icons-fonts@1.0.8/src/index.js",
  "https://unpkg.com/akar-icons-fonts/src/css/akar-icons.css"
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(workerCache).then(cache => {
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
