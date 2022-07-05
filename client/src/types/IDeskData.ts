interface IDeskDayData {
  listTasks: string[]
  listTimes: string[]
  data: TTask[]
}

interface TTask {
  taskContent: string
  timeTask: string
}

export type { IDeskDayData, TTask }
