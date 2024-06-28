function sendMessageToTab(tabId, message) {
  chrome.tabs.sendMessage(tabId, message, function (response) {
    if (chrome.runtime.lastError) {
      console.log("Error sending message:", chrome.runtime.lastError.message);
      // Retry sending the message after a short delay
      setTimeout(() => sendMessageToTab(tabId, message), 1000);
    }
  });
}

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab.url.includes("youtube.com/watch")) {
      sendMessageToTab(tab.id, { action: "checkVisibility" });
    }
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    tab.url.includes("youtube.com/watch") &&
    changeInfo.status === "complete"
  ) {
    sendMessageToTab(tabId, { action: "checkVisibility" });
  }
});
