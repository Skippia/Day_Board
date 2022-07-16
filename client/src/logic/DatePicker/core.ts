// ? Functional core

import type { IFullDate } from '~/types/types'

const findElementByDay = (day: number) => document.querySelector(`[data-day="${day}"]`) as HTMLElement

function updateDate({ oldDate, newDate }: { oldDate: IFullDate; newDate: IFullDate }) {
    oldDate.day = newDate.day || oldDate.day
    oldDate.month = newDate.month || oldDate.month
    oldDate.year = newDate.year || oldDate.year
}
//* Remove style from chosen day
const disactivate = ({ target, activeClasses }: { target: HTMLElement | undefined; activeClasses: string[] }) => {
    if (!target) return
    activeClasses.forEach((el) => target.classList.remove(el))
    target.removeAttribute('role')
}

//* Apply style for chosen day
const activate = ({ target, activeClasses }: { target: HTMLElement | undefined; activeClasses: string[] }) => {
    if (!target) return
    activeClasses.forEach((el) => target.classList.add(el))
    target.setAttribute('role', 'active-day')
}

export { updateDate, disactivate, activate, findElementByDay }
