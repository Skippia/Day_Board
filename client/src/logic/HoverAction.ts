import { FlexFunction } from '~/types/types'

interface IHoverOnElement {
    isHoverElement: (target: HTMLElement) => boolean
    actionOnHover: FlexFunction
    failurePreCondition?: FlexFunction<boolean>
    hoverActionWatcher: (e: Event) => void
}

class HoverAction implements IHoverOnElement {
    isHoverElement: (target: HTMLElement) => boolean
    actionOnHover: FlexFunction
    failurePreCondition: undefined | FlexFunction<boolean>

    constructor({
        initHoverOnElement,
        isHoverElement,
        actionOnHover,
        failurePreCondition,
    }: {
        initHoverOnElement: FlexFunction
        isHoverElement: (target: HTMLElement) => boolean
        actionOnHover: FlexFunction
        failurePreCondition?: FlexFunction<boolean>
    }) {
        if (initHoverOnElement) {
            // If there is initial action - to run it
            initHoverOnElement()
        }
        this.isHoverElement = isHoverElement
        this.actionOnHover = actionOnHover
        this.failurePreCondition = failurePreCondition
    }

    init() {
        return this.hoverActionWatcher.bind(this)
    }

    hoverActionWatcher(e: Event) {
        const target = e.target as HTMLElement

        // Check if it is hover element
        if (!this.isHoverElement(target)) return

        // Check and whether is possible - start action process
        if (this.failurePreCondition && this.failurePreCondition(target)) return

        this.actionOnHover(target)
    }
}

export { HoverAction }
