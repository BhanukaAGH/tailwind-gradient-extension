import React from "react"

import { ScrollArea } from "~components/ui/scroll-area"
import { gradients } from "~constants/gradients"
import { cn } from "~lib/utils"

const GradientTab = () => {
  const changeGradient = (color: string) => {
    chrome.runtime.sendMessage({
      action: "changeGradient",
      value: color
    })
  }

  return (
    <ScrollArea className="h-[460px] overflow-auto">
      <div className="grid grid-cols-2 gap-4">
        {gradients.map((color, i) => (
          <div
            key={i}
            className={cn("aspect-video w-full rounded-md", color)}
            onClick={() => changeGradient(color)}
          />
        ))}
      </div>
    </ScrollArea>
  )
}

export default GradientTab
