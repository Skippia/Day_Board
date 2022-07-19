import type { IMapperForXTable, ITask } from '~/types/types'

const useXTableTodoInit = (StoreUser: ReturnType<typeof useStoreUser>) => {
    const currentList: Array<ITask> = reactive(
        (StoreUser.loadDataAboutCurrentDay() && StoreUser.getDayData) || ([] as Array<ITask>)
    )

    const times = StoreUser.getTimes
    const tasks = StoreUser.geITasks

    const xMapper: IMapperForXTable = {
        elements: tasks,
        attributeNameTh: 'data-task-th',
        attributeNameTd: 'data-task',
        transformFnTd: (source: string) => source,
        transformFnTh: (source: string) => source,
    }
    const yMapper: IMapperForXTable = {
        elements: times,
        attributeNameTh: 'data-time-th',
        attributeNameTd: 'data-time',
        transformFnTd: (source: string) => source,
        transformFnTh: (source: string) => source,
    }

    const searcherTds = () => [...document.querySelectorAll('td')].filter((el) => !el.classList.contains('time'))
    const searcherTable = () => document.querySelector('table')
    const isTableCell = UTIL.createSelector({ tagName: 'td' })
    const drawHoverRect = () => {
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
        return hoverRect
    }

    return { xMapper, yMapper, currentList, searcherTds, searcherTable, isTableCell, drawHoverRect }
}

export { useXTableTodoInit }
