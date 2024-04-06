import type { PlasmoCSConfig } from "plasmo"
import colors from "tailwindcss/colors"

import { stopPositions } from "~constants/position"

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

  if (message.action === "changeCustomGradient") {
    if (selectElement != null) {
      const [position, fromColor, viaColor, toColor] = message.value.split(" ")

      const actualPosition = stopPositions
        .filter((p) => (p.value as any) === position)[0]
        .name.toLowerCase()

      const actualColor = (whatColor: any) =>
        colors[whatColor.split("-")[1]][whatColor.split("-")[2]]

      const actualFromColor = actualColor(fromColor)
      const actualViaColor = actualColor(viaColor)
      const actualToColor = actualColor(toColor)

      selectElement.style.background = `linear-gradient(to ${actualPosition}, ${actualFromColor}, ${actualViaColor}, ${actualToColor})`
    }
  }
})
