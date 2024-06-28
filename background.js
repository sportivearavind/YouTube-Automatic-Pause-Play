chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab.url.includes("youtube.com/watch")) {
      chrome.tabs.sendMessage(tab.id, { action: "checkVisibility" });
    }
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    tab.url.includes("youtube.com/watch") &&
    changeInfo.status === "complete"
  ) {
    chrome.tabs.sendMessage(tabId, { action: "checkVisibility" });
  }
});
