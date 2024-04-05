import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}

let isPickElement = false
export let selectElement: HTMLElement | null = null

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "pickElement") {
    isPickElement = message.value
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
