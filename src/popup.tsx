import { SquareMousePointer } from "lucide-react"
import { useEffect, useState } from "react"

import GeneratorTab from "~components/tabs/generator-tab"
import GradientTab from "~components/tabs/gradient-tab"
import { Button } from "~components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~components/ui/tabs"
import { fromColors, toColors, viaColors } from "~constants/colors"
import { stopPositions } from "~constants/position"

import "~style.css"

const generateRandom = (array: any[] | readonly {}[]) => {
  return array[Math.floor(Math.random() * array.length)]
}

const IndexPopup = () => {
  const [pickElement, setPickElement] = useState(false)
  const [stopPosition, setStopPosition] = useState(
    generateRandom(stopPositions).value
  )
  const [fromColor, setFromColor] = useState(generateRandom(fromColors))
  const [viaColor, setViaColor] = useState(generateRandom(viaColors))
  const [toColor, setToColor] = useState(generateRandom(toColors))

  useEffect(() => {
    if (pickElement) {
      chrome.runtime.sendMessage({
        action: "pickElement",
        value: pickElement
      })
    }
  }, [pickElement])

  return (
    <div className="flex flex-col w-[400px] h-[600px] border-t overflow-hidden">
      <div className="flex items-center justify-between p-4 py-3 border-b">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-neutral-900" />
          <div className="text-sm font-semibold">Tailwind Gradient</div>
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
        <Tabs defaultValue="gradients">
          <TabsList className="w-full">
            <TabsTrigger value="gradients" className="w-full">
              Gradients
            </TabsTrigger>
            <TabsTrigger value="generator" className="w-full">
              Generator
            </TabsTrigger>
          </TabsList>
          <TabsContent value="gradients" className="pt-1">
            <GradientTab />
          </TabsContent>
          <TabsContent value="generator" className="pt-1">
            <GeneratorTab
              stopPosition={stopPosition}
              fromColor={fromColor}
              viaColor={viaColor}
              toColor={toColor}
              setStopPosition={setStopPosition}
              setFromColor={setFromColor}
              setViaColor={setViaColor}
              setToColor={setToColor}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default IndexPopup
