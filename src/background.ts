export {}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "toggleMouse") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "toggleMouse",
        value: message.value
      })
    })
  }

  if (message.action === "changeBackground") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "changeBackground",
        value: message.value
      })
    })
  }
})
