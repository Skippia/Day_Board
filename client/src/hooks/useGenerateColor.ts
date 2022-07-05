const useGenerateColor = ({
  colorTransparency,
  rangeTransparency,
}: {
  colorTransparency: number[]
  rangeTransparency: number[]
}) => {
  const getRandomValue = (rangeArray: Array<number>) => {
    return rangeArray[0] + Math.round(Math.random() * (rangeArray[1] - rangeArray[0]))
  }

  const initGeneratorColor = ({
    colorTransparency,
    rangeTransparency,
  }: {
    colorTransparency: number[]
    rangeTransparency: number[]
  }) => {
    return () => {
      return `rgba(${getRandomValue(colorTransparency)},${getRandomValue(colorTransparency)},${getRandomValue(
        colorTransparency,
      )},${getRandomValue(rangeTransparency) / 100})`
    }
  }

  const generateColor = initGeneratorColor({ colorTransparency, rangeTransparency })

  return { generateColor }
}

export { useGenerateColor }
