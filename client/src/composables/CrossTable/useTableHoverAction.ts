import { HoverAction } from '~/logic/HoverAction'
import type { TMouseEvent, TRefreshRect } from '~/types/types'

const useTableHoverAction = ({
    searcherTable,
    isHoverElement,
}: {
    searcherTable: () => HTMLElement | null
    isHoverElement: (target: HTMLElement) => boolean
}) => {
    const initRepaintProcess = ({
        getCoordinatesFromElement,
        refreshRect,
    }: {
        getCoordinatesFromElement: (element: HTMLElement) => DOMRect
        refreshRect: ({ rect, targetCoordinates }: TRefreshRect) => void
    }) => {
        return (target: HTMLElement) => {
            const targetCoordinates = getCoordinatesFromElement(target)
            const refreshingHover = document.querySelector('.rect') as HTMLElement
            refreshRect({ rect: refreshingHover, targetCoordinates })
        }
    }

    //* FlexFunction will be runned during first binding event to the target
    const createHoverRect = (rootElement: HTMLElement) => {
        return () => {
            const hoverRect = document.createElement('div') as HTMLElement
            hoverRect.classList.add('rect')
            hoverRect.style.background = 'transparent'
            hoverRect.style.borderBottomColor = 'rgba(255,255,255,0.2)'
            hoverRect.style.borderRightColor = 'rgba(255,255,255,0.2)'

            hoverRect.style.position = 'absolute'

            hoverRect.style.transitionProperty = 'all'
            hoverRect.style.transitionDuration = '0.15s'
            hoverRect.style.transitionTimingFlexFunction = 'ease-out'

            hoverRect.style.pointerEvents = 'none'

            rootElement.append(hoverRect)
        }
    }
    const hoverActionOnTableCell = ref<TMouseEvent>(() => {})
    onMounted(() => {
        // ? Hover on table cell
        const table = searcherTable()
        if (table) {
            hoverActionOnTableCell.value = new HoverAction({
                initHoverOnElement: createHoverRect(table),
                isHoverElement,
                actionOnHover: initRepaintProcess({
                    getCoordinatesFromElement: UTIL.getCoordinatesFromElement,
                    refreshRect: UTIL.refreshRect,
                }),
            }).init()
        }
    })
    return { hoverActionOnTableCell }
}

export { useTableHoverAction }
