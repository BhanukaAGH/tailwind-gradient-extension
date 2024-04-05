import type { PlasmoCSConfig } from "plasmo"

import { selectElement } from "./plasmo-pickElement"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "changeGradient") {
    if (selectElement != null) {
      const gradient = message.value
      selectElement.style.background = gradient
        .substring(4, gradient.length - 1)
        .replaceAll("_", " ")
    }
  }
})
