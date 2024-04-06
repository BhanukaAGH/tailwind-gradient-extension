const colorNames = [
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose"
] as const

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const

export const colors = [
  ...colorNames
    .map((color) => {
      return shades.map((shade) => `bg-${color}-${shade}` as const)
    })
    .flat(),
  "bg-white",
  "bg-black",
  "bg-transparent"
] as const

export const fromColors = colors.map((color) => color.replace("bg-", "from-"))
export const viaColors = colors.map((color) => color.replace("bg-", "via-"))
export const toColors = colors.map((color) => color.replace("bg-", "to-"))
