import type { Dispatch, SetStateAction } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"

import { Button } from "~components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "~components/ui/select"
import { fromColors, toColors, viaColors } from "~constants/colors"
import { stopPositions } from "~constants/position"
import { cn } from "~lib/utils"

interface GeneratorTabProps {
  stopPosition: string
  fromColor: string
  viaColor: string
  toColor: string
  setStopPosition: Dispatch<SetStateAction<string>>
  setFromColor: Dispatch<SetStateAction<string>>
  setViaColor: Dispatch<SetStateAction<string>>
  setToColor: Dispatch<SetStateAction<string>>
  randomizeGradient: () => void
}

const GeneratorTab = ({
  stopPosition,
  fromColor,
  viaColor,
  toColor,
  setStopPosition,
  setFromColor,
  setViaColor,
  setToColor,
  randomizeGradient
}: GeneratorTabProps) => {
  const changeCustomGradient = (gradient: string) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "changeCustomGradient",
        value: gradient
      })
    })
  }

  return (
    <div className="grid gap-3">
      <Select value={stopPosition} onValueChange={setStopPosition}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="h-56">
          {stopPositions.map((position) => (
            <SelectItem key={position.value} value={position.value}>
              {position.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={fromColor} onValueChange={setFromColor}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="h-56">
          {fromColors.map((from) => (
            <SelectItem key={from} value={from}>
              <div className="flex items-center gap-x-2">
                <div className={`h-4 w-4 ${from.replaceAll("from", "bg")}`} />
                <p>{from}</p>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={viaColor} onValueChange={setViaColor}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="h-56">
          {viaColors.map((via) => (
            <SelectItem key={via} value={via}>
              <div className="flex items-center gap-x-2">
                <div className={`h-4 w-4 ${via.replaceAll("via", "bg")}`} />
                <p>{via}</p>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={toColor} onValueChange={setToColor}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="h-56">
          {toColors.map((to) => (
            <SelectItem key={to} value={to}>
              <div className="flex items-center gap-x-2">
                <div className={`h-4 w-4 ${to.replaceAll("to", "bg")}`} />
                <p>{to}</p>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div
        className={cn(
          "w-full flex items-center justify-between aspect-video rounded-md mt-2",
          `${stopPosition} ${fromColor} ${viaColor} ${toColor}`
        )}
      />

      <div className="flex items-center space-x-3 justify-center">
        <Button
          size="xs"
          onClick={() =>
            changeCustomGradient(
              `${stopPosition} ${fromColor} ${viaColor} ${toColor}`
            )
          }>
          preview
        </Button>
        <CopyToClipboard
          text={`${stopPosition} ${fromColor} ${viaColor} ${toColor}`}>
          <Button size="xs">copy code</Button>
        </CopyToClipboard>
        <Button size="xs" onClick={randomizeGradient}>
          random
        </Button>
      </div>
    </div>
  )
}

export default GeneratorTab
