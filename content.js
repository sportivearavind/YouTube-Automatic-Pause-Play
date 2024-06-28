document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    document.querySelector("video").pause();
  } else {
    document.querySelector("video").play();
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "checkVisibility") {
    if (document.hidden) {
      document.querySelector("video").pause();
    } else {
      document.querySelector("video").play();
    }
  }
});
