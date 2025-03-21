self.addEventListener("install", (e) => {
    console.log("Service worker installed")
})

self.addEventListener("activate", () => {
    console.log("Service worker activated")
})

const urlToOpen = "https://www.instagram.com";
const intervalInMinutes = 0.1;
// Function to open and close the tab
function openAndCloseTab() {
    chrome.tabs.create({ url: urlToOpen }, (tab) => {
        // Close the tab after a short delay (e.g., 1 second)
        setTimeout(() => {
            chrome.tabs.remove(tab.id);
        }, 1000);
    });
}

// Set up an alarm to trigger the function periodically
// chrome.alarms.create("periodicTabOpener", { periodInMinutes: intervalInMinutes });

// Listen for the alarm
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "periodicTabOpener") {
        // openAndCloseTab();
    }
});
