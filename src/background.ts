export {}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "pickElement") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "pickElement",
        value: message.value
      })
    })
  }

  if (message.action === "changeGradient") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "changeGradient",
        value: message.value
      })
    })
  }
})
