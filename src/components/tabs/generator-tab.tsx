import type { Dispatch, SetStateAction } from "react"

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
}

const GeneratorTab = ({
  stopPosition,
  fromColor,
  viaColor,
  toColor,
  setStopPosition,
  setFromColor,
  setViaColor,
  setToColor
}: GeneratorTabProps) => {
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
              {from}
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
              {via}
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
              {to}
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
    </div>
  )
}

export default GeneratorTab
