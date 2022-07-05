import type { TTask } from '~/types/IDeskData'
import { FireAction } from '~/utils/FireAction'

const useTableFireAction = (generateColor: () => string, updateCurrentDay: Function, currentList: TTask[]) => {
  const changeCurrentTaskAmount = (generateColor: () => string, updateCurrentDay: Function) => {
    return (target: HTMLElement, isComplete: boolean) => {
      if (isComplete) {
        currentList.push({ taskContent: target.dataset.task as string, timeTask: target.dataset.time as string })
        target.style.backgroundColor = 'rgb(34,197,94)'
      }
      else {
        target.style.backgroundColor = generateColor()
        const findIndex = currentList.findIndex((el: TTask) => el.taskContent === (target.dataset.task as string))
        currentList.splice(findIndex, 1)
      }
      updateCurrentDay(currentList)
    }
  }

  const isTableCellElement = (target: HTMLElement) => target.tagName.toLowerCase() === 'td'

  const createFailurePreConditionForTableCell = (currentList: TTask[]) => {
    return (target: HTMLElement) => {
      const currentTask = target.dataset.task as string
      const taskIsAlreadyCompleted = target.style.backgroundColor === 'rgb(34, 197, 94)'

      return Boolean(currentList.find(el => el.taskContent === currentTask) && !taskIsAlreadyCompleted)
    }
  }

  const createActionOnFireTableCell = (callbackFn: Function) => {
    return (target: HTMLElement) => {
      const taskIsAlreadyCompleted = target.style.backgroundColor === 'rgb(34, 197, 94)'

      let taskIsCompleted = true
      if (taskIsAlreadyCompleted)
        taskIsCompleted = false

      callbackFn(target, taskIsCompleted)
    }
  }

  const failurePreConditionForTableCell = createFailurePreConditionForTableCell(currentList)

  // ? Fire on table cell
  const fireActionOnTableCell = new FireAction({
    isFireElement: isTableCellElement,
    failurePreCondition: failurePreConditionForTableCell,
    actionOnFire: createActionOnFireTableCell(changeCurrentTaskAmount(generateColor, updateCurrentDay)),
  }).init()

  return {
    fireActionOnTableCell,
  }
}

export { useTableFireAction }
