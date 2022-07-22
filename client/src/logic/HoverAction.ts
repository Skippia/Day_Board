import { TFlexFunction } from '~/types/types'

interface IHoverOnElement {
    isHoverRepaintTriggerEl: (target: HTMLElement) => boolean
    actionOnHover: TFlexFunction
    failurePreCondition?: TFlexFunction<boolean>
    hoverActionWatcher: (e: Event) => void
}

class HoverAction implements IHoverOnElement {
    isHoverRepaintTriggerEl: (target: HTMLElement) => boolean
    actionOnHover: TFlexFunction
    failurePreCondition: undefined | TFlexFunction<boolean>

    constructor({
        initHoverOnElement,
        isHoverRepaintTriggerEl,
        actionOnHover,
        failurePreCondition,
    }: {
        initHoverOnElement: TFlexFunction
        isHoverRepaintTriggerEl: (target: HTMLElement) => boolean
        actionOnHover: TFlexFunction
        failurePreCondition?: TFlexFunction<boolean>
    }) {
        if (initHoverOnElement) {
            // If there is initial action - to run it
            initHoverOnElement()
        }
        this.isHoverRepaintTriggerEl = isHoverRepaintTriggerEl
        this.actionOnHover = actionOnHover
        this.failurePreCondition = failurePreCondition
    }

    init() {
        return this.hoverActionWatcher.bind(this)
    }

    hoverActionWatcher(e: Event) {
        const target = e.target as HTMLElement
        console.log(target)

        // Check if it is hover element
        if (!this.isHoverRepaintTriggerEl(target)) return

        // Check and whether is possible - start action process
        if (this.failurePreCondition && this.failurePreCondition(target)) return

        this.actionOnHover(target)
    }
}

export { HoverAction }
