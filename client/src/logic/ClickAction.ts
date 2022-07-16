import { FlexFunction } from '~/types/types'

interface IClickAction {
    isClickElement: (target: HTMLElement) => boolean
    actionOnClick: FlexFunction
    failurePreCondition?: FlexFunction<boolean>
    clickActionWatcher: (e: Event) => void
}

class ClickAction implements IClickAction {
    isClickElement: (target: HTMLElement) => boolean
    actionOnClick: FlexFunction
    failurePreCondition: FlexFunction<boolean>

    constructor({
        isClickElement,
        actionOnClick,
        failurePreCondition,
    }: {
        isClickElement: (target: HTMLElement) => boolean
        actionOnClick: FlexFunction
        failurePreCondition: FlexFunction<boolean>
    }) {
        this.isClickElement = isClickElement
        this.actionOnClick = actionOnClick
        this.failurePreCondition = failurePreCondition
    }

    init() {
        return this.clickActionWatcher.bind(this)
    }

    clickActionWatcher(e: Event) {
        const target = e.target as HTMLElement
        if (!this.isClickElement(target)) return
        if (this.failurePreCondition && this.failurePreCondition(target)) return

        this.actionOnClick(target)
    }
}

export { ClickAction }
