self.addEventListener("install", (e) => {
    console.log("Service worker installed")
})

self.addEventListener("activate", () => {
    console.log("Service worker activated")
})