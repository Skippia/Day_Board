import { type Ref, onMounted, ref } from 'vue'
import { HoverAction, type ICoordinates } from '../utils/HoverAction'

const useTableHoverAction = (searcher: () => HTMLElement | null) => {
  //* * Common functions */

  const getCoordinatesFromElement = (element: HTMLElement) => {
    const { x: xStart, y: yStart, width, height } = element.getBoundingClientRect()
    return { xStart, yStart, width, height }
  }

  const refreshHoverRect = (hoverRect: HTMLElement, targetCoordinates: ICoordinates) => {
    const { xStart, yStart, width, height } = targetCoordinates
    hoverRect!.style.left = hoverRect!.style.top = '0'
    hoverRect!.style.width = `${xStart + width}px`
    hoverRect!.style.height = `${yStart + height}px`
    hoverRect!.style.borderBottomWidth = `${height}px`
    hoverRect!.style.borderRightWidth = `${width}px`
  }

  const getDataPreConditionTableCell = (target: HTMLElement) => {
    const horizontalEl = document.querySelector(`[data-time-th="${target.dataset.time as string}"`) as HTMLElement
    const verticalEl = document.querySelector(`[data-task-th="${target.dataset.task as string}"`) as HTMLElement
    return [target, horizontalEl, verticalEl]
  }

  //* * Function factories */

  const createIsHoverElement = ({ tagName, className }: { tagName?: string; className?: string }) => {
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

  const initRepaintProcess = ({
    getCoordinatesFromElement,
    refreshHoverRect,
  }: {
    getCoordinatesFromElement: Function
    refreshHoverRect: Function
  }) => {
    return (target: HTMLElement) => {
      const targetCoordinates = getCoordinatesFromElement(target) as HTMLElement
      const refreshingHover = document.querySelector('.rect')
      refreshHoverRect(refreshingHover, targetCoordinates)
    }
  }

  const createFailurePreConditionHoverForTableCell = (getData: (target: HTMLElement) => Array<HTMLElement | null>) => {
    return (target: HTMLElement) => {
      const elements = getData(target)
      const isContainNull = elements.includes(null)

      return isContainNull === true
    }
  }

  //* * Function implements */

  //* Function will be runed during first binding event to the target
  const initHoverOnTableCell = (rootElement: HTMLElement) => {
    return () => {
      const hoverRect = document.createElement('div') as HTMLElement
      hoverRect.classList.add('rect')
      hoverRect.style.background = 'transparent'
      hoverRect.style.borderBottomColor = 'rgba(255,255,255,0.2)'
      hoverRect.style.borderRightColor = 'rgba(255,255,255,0.2)'

      hoverRect.style.position = 'absolute'

      hoverRect.style.transitionProperty = 'all'
      hoverRect.style.transitionDuration = '0.15s'
      hoverRect.style.transitionTimingFunction = 'ease-out'

      hoverRect.style.pointerEvents = 'none'

      rootElement.append(hoverRect)
    }
  }
  const isHoverTableCell = createIsHoverElement({ tagName: 'td' })
  const failurePreConditionHoverForTableCell = createFailurePreConditionHoverForTableCell(getDataPreConditionTableCell)
  const actionOnTableCellHover = initRepaintProcess({ getCoordinatesFromElement, refreshHoverRect })

  const hoverActionOnTableCell: Ref<(e: Event) => void> = ref() as Ref<(e: Event) => void>
  onMounted(() => {
    // ? Hover on table cell
    const table = searcher()
    if (table) {
      hoverActionOnTableCell.value = new HoverAction({
        initHoverOnElement: initHoverOnTableCell(table),
        isHoverElement: isHoverTableCell,
        failurePreCondition: failurePreConditionHoverForTableCell,
        actionOnHover: actionOnTableCellHover,
      }).init()
    }
  })
  return { hoverActionOnTableCell }
}

export { useTableHoverAction }
