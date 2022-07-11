interface IDate { year: number; month: number; day: number }

interface IDeskDayData {
  listTasks: string[]
  listTimes: string[]
  data: TTask[]
}

interface TTask {
  taskContent: string
  timeTask: string
}
type TFunctionCondition = (...args: any[]) => boolean

interface IMapperForCrossTable {
  elements: string[]
  attributeNameTh: string
  attributeNameTd: string
  transformFnTd: (source: string) => string
  transformFnTh: (source: string) => string
}
interface IUserInfo {
  _id: string
  email: string
  name: string
  gender: TUserGender
  role: TUserRole
}

interface TFilter {
  run: (e: MouseEvent) => void
  condition: (e: MouseEvent) => boolean
  restoreChosenDay: (currentDate: { month: number; year: number }) => void
  init: () => void
  beforeRemove: () => void
}

type TUserGender = 'MALE' | 'FEMALE'
type TUserRole = 'USER' | 'ADMIN'
type TNetworkMethod = 'get' | 'post' | 'patch' | 'delete'
type TRefreshRect = (rect: HTMLElement, targetCoordinates: DOMRect) => void
type TMouseEvent = (e: MouseEvent) => void
export type {
  IUserInfo, TUserGender, TUserRole,
  TFunctionCondition, IMapperForCrossTable, IDeskDayData,
  TTask, IDate, TNetworkMethod, TRefreshRect, TFilter, TMouseEvent,
}

