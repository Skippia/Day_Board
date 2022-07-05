import { reactive } from 'vue'
import type { MapperForCrossTable } from '~/components/__reusable__/CrossTable/TCrossTable'
// import type { useStoreUser } from '~/stores/useStoreUser'
import type { TTask } from '~/types/IDeskData'

const rangeTransparency = [0, 70]
const colorTransparency = [0, 30]

const searcherTds = () => {
  // @ts-expect-error this one really has
  return [...document.querySelectorAll('td')].filter(el => !el.classList.contains('time'))
}

const searcherTable = () => {
  return document.querySelector('table')
}

const useInitStartValues = (StoreUser: ReturnType<typeof useStoreUser>) => {
  const currentList: Array<TTask> = reactive(
    (StoreUser.loadDataAboutCurrentDay() && StoreUser.getDayData) || ([] as Array<TTask>),
  )

  const times = StoreUser.getTimes
  const tasks = StoreUser.getTasks

  const xMapper: MapperForCrossTable = {
    elements: tasks,
    attributeNameTh: 'data-task-th',
    attributeNameTd: 'data-task',
    transformFnTd: (source: string) => source,
    transformFnTh: (source: string) => source,
  }
  const yMapper: MapperForCrossTable = {
    elements: times,
    attributeNameTh: 'data-time-th',
    attributeNameTd: 'data-time',
    transformFnTd: (source: string) => source,
    transformFnTh: (source: string) => source,
  }

  return { searcherTds, searcherTable, rangeTransparency, colorTransparency, xMapper, yMapper, times, tasks, currentList }
}

export { useInitStartValues }
