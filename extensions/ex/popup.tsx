import { useState } from "react"

function IndexPopup() {


  // let tabId: number | null = null

  // const openAndCloseTab = async () => {
  //   try {
  //     // Open a new tab
  //     const tab = await chrome.tabs.create({ url: "https://example.com" })
  //     tabId = tab.id || null

  //     console.log(`Opened tab with ID: ${tabId}`)

  //     // Close after 1 second
  //     setTimeout(() => {
  //       if (tabId) {
  //         chrome.tabs.remove(tabId, () => {
  //           console.log(`Closed tab with ID: ${tabId}`)
  //           tabId = null
  //         })
  //       }
  //     }, 1000)
  //   } catch (error) {
  //     console.error("Error opening or closing tab:", error)
  //   }
  // }

  // // Run every second  
  // // setInterval(openAndCloseTab, 1000)

  // chrome.alarms.create("repeat-task", { periodInMinutes: 0.1 }) // Every 6 seconds

  // chrome.alarms.onAlarm.addListener((alarm) => {
  //   if (alarm.name === "repeat-task") {
  //     openAndCloseTab()
  //   }
  // })
  const s = navigator.serviceWorker
  s.register(new URL('/service.js', import.meta.url)).
    then(() => console.log("Service worker `/service.js` working"))
    .catch((c) => console.error("Error in /service.js", c))


  return (
    <div
      style={{
        overflow: "auto",
        width: "1000px",
        height: "100%",
      }}
    >
    </div>
  )
}

export default IndexPopup
