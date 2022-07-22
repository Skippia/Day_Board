import { HoverAction } from '~/logic/HoverAction'
import type { TMouseEvent, IRefreshRect } from '~/types/types'

const useVTableHoverOverlay = ({
    searcherTable,
    isHoverRepaintTriggerEl,
    drawHoverRect,
}: {
    searcherTable: () => HTMLElement | null
    isHoverRepaintTriggerEl: (target: HTMLElement) => boolean
    drawHoverRect: () => HTMLElement
}) => {
    const initRepaintProcess = ({
        getCoordinatesFromElement,
        refreshRect,
    }: {
        getCoordinatesFromElement: (element: HTMLElement) => DOMRect
        refreshRect: ({ rect, targetCoordinates }: IRefreshRect) => void
    }) => {
        return (target: HTMLElement) => {
            const targetCoordinates = getCoordinatesFromElement(target)
            const refreshingHover = document.querySelector('.rect') as HTMLElement
            refreshRect({ rect: refreshingHover, targetCoordinates })
        }
    }

    //* TFlexFunction will be runned during first binding event to the target
    const createHoverRect = (rootElement: HTMLElement) => {
        return () => {
            const hoverRect = drawHoverRect()
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
                isHoverRepaintTriggerEl,
                actionOnHover: initRepaintProcess({
                    getCoordinatesFromElement: UTIL.getCoordinatesFromElement,
                    refreshRect: UTIL.refreshRect,
                }),
            }).init()
        }
    })
    return { hoverActionOnTableCell }
}

export { useVTableHoverOverlay }
