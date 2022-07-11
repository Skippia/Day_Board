import type { IMapperForCrossTable, TTask } from '~/types/types'

const useInitCrossTableValues = (StoreUser: ReturnType<typeof useStoreUser>) => {
  const currentList: Array<TTask> = reactive(
    (StoreUser.loadDataAboutCurrentDay() && StoreUser.getDayData) || ([] as Array<TTask>),
  )

  const times = StoreUser.getTimes
  const tasks = StoreUser.getTasks

  const xMapper: IMapperForCrossTable = {
    elements: tasks,
    attributeNameTh: 'data-task-th',
    attributeNameTd: 'data-task',
    transformFnTd: (source: string) => source,
    transformFnTh: (source: string) => source,
  }
  const yMapper: IMapperForCrossTable = {
    elements: times,
    attributeNameTh: 'data-time-th',
    attributeNameTd: 'data-time',
    transformFnTd: (source: string) => source,
    transformFnTh: (source: string) => source,
  }

  return { xMapper, yMapper, times, tasks, currentList }
}

export { useInitCrossTableValues }
