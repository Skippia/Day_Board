import type { TRefreshRect } from '~/types/types'

const UTIL = {
  getCoordinatesFromElement: (element: HTMLElement) => element.getBoundingClientRect(),
  createSelector: ({ tagName, className }: { tagName?: string; className?: string }) => {
    return (target: HTMLElement) => {
      if (tagName && className)
        return target.tagName.toLowerCase() === tagName && target.classList.contains(className)

      else if (!tagName && className)
        return target.classList.contains(className)

      else if (tagName && !className)
        return target.tagName.toLowerCase() === tagName

      else
        return false
    }
  },
  refreshRect: ({ rect, targetCoordinates }: TRefreshRect): void => {
    const { x: xStart, y: yStart, width, height } = targetCoordinates
    rect!.style.left = rect!.style.top = '0'
    rect!.style.width = `${xStart + width}px`
    rect!.style.height = `${yStart + height}px`
    rect!.style.borderBottomWidth = `${height}px`
    rect!.style.borderRightWidth = `${width}px`
  },
  getAverageVal: (array: number[]) => array.reduce((acc, cur) => acc + cur, 0) / array.length,
}

export { UTIL }
