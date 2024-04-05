import { SquareMousePointer } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "~components/ui/button"
import { ScrollArea } from "~components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~components/ui/tabs"
import { colors } from "~constants/colors"
import { shadows } from "~constants/shadows"
import { cn } from "~lib/utils"

import "~style.css"

const IndexPopup = () => {
  const [pickElement, setPickElement] = useState(false)

  const changeBackground = (color: string) => {
    chrome.runtime.sendMessage({
      action: "changeBackground",
      value: color
    })
  }

  useEffect(() => {
    if (pickElement) {
      chrome.runtime.sendMessage({
        action: "toggleMouse",
        value: pickElement
      })
    }
  }, [pickElement])

  return (
    <div className="flex flex-col w-[400px] h-[600px] border-t overflow-hidden">
      <div className="flex items-center justify-between p-4 py-3 border-b">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-neutral-900" />
          <div className="text-sm font-semibold">Tailwind Background</div>
        </div>

        <Button
          size="sm"
          className="p-0 aspect-square"
          variant="outline"
          onClick={() => setPickElement((prevState) => !prevState)}>
          <SquareMousePointer size={24} />
        </Button>
      </div>

      <div className="flex-1 grid gap-4 p-4">
        <Tabs defaultValue="background">
          <TabsList className="w-full">
            <TabsTrigger value="background" className="w-full">
              Background
            </TabsTrigger>
            <TabsTrigger value="boxshadow" className="w-full">
              Box Shadow
            </TabsTrigger>
          </TabsList>
          <TabsContent value="background" className="pt-1">
            <ScrollArea className="h-[460px] overflow-auto">
              <div className="grid grid-cols-2 gap-4">
                {colors.map((color, i) => (
                  <div
                    key={i}
                    className={cn("aspect-video w-full rounded-md", color)}
                    onClick={() => changeBackground(color)}
                  />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="boxshadow">
            <ScrollArea className="h-[460px]">
              <div className="grid gap-20 p-14">
                {shadows.map((shadow, i) => (
                  <div key={i} className="relative">
                    <div
                      className={cn(
                        "absolute -inset-2 rounded-lg opacity-50 blur-2xl",
                        shadow
                      )}></div>
                    <div className="relative w-full aspect-[16/6] rounded-lg bg-white flex items-center justify-center">
                      Content
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default IndexPopup
