let pausedByScript = false;

document.addEventListener("visibilitychange", () => {
  const video = document.querySelector("video");
  if (video) {
    if (document.hidden) {
      if (!video.paused) {
        video.pause();
        pausedByScript = true;
      }
    } else {
      if (pausedByScript) {
        video.play();
        pausedByScript = false;
      }
    }
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "checkVisibility") {
    const video = document.querySelector("video");
    if (video) {
      if (document.hidden) {
        if (!video.paused) {
          video.pause();
          pausedByScript = true;
        }
      } else {
        if (pausedByScript) {
          video.play();
          pausedByScript = false;
        }
      }
    }
  }
});
