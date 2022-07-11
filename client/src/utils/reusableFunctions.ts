import type { TRefreshRect } from '~/types/types'

const utilGetCoordinatesFromElement = (element: HTMLElement) => element.getBoundingClientRect()

const utilCreateSelector = ({ tagName, className }: { tagName?: string; className?: string }) => {
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
}

const utilRefreshRect: TRefreshRect = (rect, targetCoordinates) => {
  const { x: xStart, y: yStart, width, height } = targetCoordinates
  rect!.style.left = rect!.style.top = '0'
  rect!.style.width = `${xStart + width}px`
  rect!.style.height = `${yStart + height}px`
  rect!.style.borderBottomWidth = `${height}px`
  rect!.style.borderRightWidth = `${width}px`
}

export { utilGetCoordinatesFromElement, utilCreateSelector, utilRefreshRect }
