import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}

let isPickElement = false
let selectElement = null

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "toggleMouse") {
    isPickElement = message.value
  }

  if (message.action === "changeBackground") {
    if (selectElement != null) {
      const background = message.value
      selectElement.style.background = background
        .substring(4, background.length - 1)
        .replaceAll("_", " ")
    }
  }
})

document.addEventListener("mousemove", (event) => {
  if (isPickElement) {
    const element = event.target as HTMLElement

    if (element.tagName.toLowerCase() === "div") {
      element.style.border = "2px solid red"

      element.addEventListener(
        "mouseout",
        () => {
          if (selectElement !== element) {
            element.style.border = ""
          }
        },
        { once: true }
      )

      if (!element.dataset.hasClickListener) {
        element.addEventListener("click", () => {
          if (selectElement != null && selectElement !== element) {
            selectElement.style.border = ""
            element.dataset.hasClickListener = "false"
          }
          selectElement = element
        })
        element.dataset.hasClickListener = "true"
      }
    }
  }
})
