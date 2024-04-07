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
    event.stopPropagation()
    const element = event.target as HTMLElement
    element.style.border = "2px solid red"

    // Remove event listeners on mouseleave
    element.addEventListener(
      "mouseout",
      () => {
        if (selectElement !== element) {
          element.style.border = ""
        }
      }
      // { once: true }
    )

    // Optimize click handling
    element.addEventListener(
      "click",
      () => {
        if (selectElement) {
          selectElement.style.border = ""
        }
        selectElement = element
      },
      { once: true }
    )
  }
})
