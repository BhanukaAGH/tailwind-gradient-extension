import { CodeXml, Eye, MousePointerClick } from "lucide-react"
import React from "react"
import CopyToClipboard from "react-copy-to-clipboard"

import { Button } from "~components/ui/button"
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
            className={cn(
              "aspect-video w-full rounded-md flex items-center justify-center group",
              color
            )}>
            <div className="hidden group-hover:flex items-center space-x-2 animate-in duration-700">
              <Button
                size="xs"
                className="hover:text-white/80"
                onClick={() => changeGradient(color)}>
                <MousePointerClick size={20} />
              </Button>
              <CopyToClipboard text={color}>
                <Button size="xs" className="hover:text-white/80">
                  <CodeXml size={20} />
                </Button>
              </CopyToClipboard>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

export default GradientTab
