interface IDate {
    year: number
    month: number
    day: number
}

interface IDeskDayData {
    listTasks: string[]
    listTimes: string[]
    completedTasks: ITask[]
}

interface ITask {
    taskContent: string
    timeTask: string
}

interface IMapperForXTable {
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

interface IFilter {
    init: (() => void) | undefined
    run: (e: MouseEvent) => void
    condition: (e: MouseEvent) => boolean
    restoreChosenDay: (currentDate: { month: number; year: number }) => void
    beforeRemove: (() => void) | undefined
}

interface IRefreshRect {
    rect: HTMLElement
    targetCoordinates: DOMRect
}

interface IFullDate {
    day: number
    month: number
    year: number
}

type IResponse = ({
    body,
    additionalUrlParams,
}: {
    body?: object
    additionalUrlParams?: string
}) => Promise<{ data?: any; error?: IResponseError }>

type IResponseError = {
    message: string
    status: number
}
type TUserGender = 'MALE' | 'FEMALE'
type TUserRole = 'USER' | 'ADMIN'
type TNetworkMethod = 'get' | 'post' | 'patch' | 'delete'
type TMouseEvent = (e: MouseEvent) => void
type TFunctionCondition = TFlexFunction<boolean>
type TFlexFunction<R = void> = (...args: any[]) => R

export type {
    ITask,
    IUserInfo,
    IDate,
    IFullDate,
    IFilter,
    IResponseError,
    IMapperForXTable,
    IDeskDayData,
    IResponse,
    TUserRole,
    TUserGender,
    TFunctionCondition,
    IRefreshRect,
    TFlexFunction,
    TMouseEvent,
    TNetworkMethod,
}
