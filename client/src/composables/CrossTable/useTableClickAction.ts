import { ClickAction } from '~/logic/ClickAction'
import type { TTask, FlexFunction } from '~/types/types'

const useTableClickAction = ({
    isClickElement,
    generateColor,
    updateCurrentDay,
    currentList,
}: {
    isClickElement: (target: HTMLElement) => boolean
    generateColor: () => string
    updateCurrentDay: FlexFunction
    currentList: TTask[]
}) => {
    const changeCurrentTaskAmount = (generateColor: () => string, updateCurrentDay: FlexFunction) => {
        return (target: HTMLElement, isComplete: boolean) => {
            //* If task is completed - paint it and update current list
            if (isComplete) {
                currentList.push({
                    taskContent: target.dataset.task as string,
                    timeTask: target.dataset.time as string,
                })
                target.style.backgroundColor = 'rgb(34,197,94)'
            }
            //* If task was deleted - give random color and delete from current list
            else {
                target.style.backgroundColor = generateColor()
                const findIndex = currentList.findIndex(
                    (el: TTask) => el.taskContent === (target.dataset.task as string)
                )
                currentList.splice(findIndex, 1)
            }
            //* Apply updateCurentDay function with new current list
            updateCurrentDay(currentList)
        }
    }

    const createFailurePreConditionForTableCell = (currentList: TTask[]) => {
        return (target: HTMLElement) => {
            const currentTask = target.dataset.task as string
            const taskIsAlreadyCompleted = target.style.backgroundColor === 'rgb(34, 197, 94)'

            //* Current task is already completed - and you try to accomplish it again, but in another time (true)
            return Boolean(currentList.find((el) => el.taskContent === currentTask) && !taskIsAlreadyCompleted)
        }
    }

    const createActionOnClickTableCell = (callback: FlexFunction) => {
        return (target: HTMLElement) => {
            const taskIsAlreadyCompleted = target.style.backgroundColor === 'rgb(34, 197, 94)'

            //* Task state after click
            let taskIsCompleted = true
            if (taskIsAlreadyCompleted) taskIsCompleted = false

            callback(target, taskIsCompleted)
        }
    }

    const failurePreConditionForTableCell = createFailurePreConditionForTableCell(currentList)
    const actionOnClickTableCell = createActionOnClickTableCell(
        changeCurrentTaskAmount(generateColor, updateCurrentDay)
    )

    // ? Click on table cell
    const clickActionOnTableCell = new ClickAction({
        isClickElement,
        failurePreCondition: failurePreConditionForTableCell,
        actionOnClick: actionOnClickTableCell,
    }).init()

    return {
        clickActionOnTableCell,
    }
}

export { useTableClickAction }
