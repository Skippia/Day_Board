// ? Imperative shell

// ? load today data -> onChangeDay -> change date for chosen day -> wipe old day -> init day element
// ? -> paint new day -> since date was updated run watch and update filter date in store
// ? -> store does request and update data for current date -> display actual date for current date range

import { activate, disactivate, findElementByDay, updateDate } from '~/logic/DatePicker/core'
import type { IFullDate } from '~/types/types'

const useDateClickListener = ({
    activeClasses,
    condition,
    primaryFilter,
    storeDatePicker,
}: {
    activeClasses: string[]
    condition: (e: MouseEvent) => boolean
    primaryFilter: boolean
    storeDatePicker: ReturnType<typeof useStoreDatePicker>
}) => {
    const getCurrentDate = computed(() => storeDatePicker.getCurrentDate)
    const lastChosenDayEl = ref<HTMLElement>()

    //* Start values equal today date
    const chosenDate = reactive({
        day: new Date().getDate(),
        month: getCurrentDate.value.month,
        year: getCurrentDate.value.year,
    })

    //* Set new day element for chosen day
    function initDayElement(day: number) {
        /* This fn init chosen day element depends on chosen day number */
        const target = findElementByDay(day)
        if (target) {
            lastChosenDayEl.value = target
            return target
        }
    }

    const toggleFilter = {
        init: initFabric(primaryFilter),
        run(e: MouseEvent) {
            // 1. Remove paint from ex day
            disactivate({ target: lastChosenDayEl.value, activeClasses })
            // 2. Set new active day
            const target = e.target as HTMLElement
            const newDay = target.dataset.day
            if (!target || !newDay) return

            updateDate({
                oldDate: chosenDate,
                newDate: {
                    day: +newDay,
                    month: getCurrentDate.value.month,
                    year: getCurrentDate.value.year,
                },
            })

            // 3. Paint new day
            activate({ target, activeClasses })
        },
        condition(e: MouseEvent) {
            return condition(e)
        },
        restoreChosenDay: restoreChosenDayFabric(chosenDate),
        beforeRemove: beforeRemoveFabric(primaryFilter),
    }

    watch(
        chosenDate,
        (newDate) => {
            initDayElement(newDate.day)
        },
        {
            immediate: true,
        }
    )

    //* Fabrics for toggleFilter

    function restoreChosenDayFabric(chosenDate: IFullDate) {
        return (currentDate: { month: number; year: number }) => {
            /* This function compare date datapicker and date of specific filter
      and in case of matching re-activate day (every time during rerendering)  */

            // It's our month
            if (DATE.compareDateMY(currentDate, chosenDate)) {
                // Init day
                const chosenDay = initDayElement(chosenDate.day) as HTMLElement
                // Paint this day
                activate({ target: chosenDay, activeClasses })
            }
        }
    }
    function initFabric(primaryFilter: boolean) {
        /* This function create fn that is invoked after creating toggleFilter */

        //* Primary filter works always
        if (primaryFilter) {
            return () => {}
        }

        //* Additional filter requires re-initialization of chosen day
        else if (!primaryFilter) {
            return function () {
                // @ts-expect-error i don't know how to type this
                this.restoreChosenDay(getCurrentDate.value)
            }
        }
    }
    function beforeRemoveFabric(primaryFilter: boolean) {
        /* This function create fn that is invoked during removing current toggleFilter */

        if (primaryFilter) {
            return () => {}
        } else if (!primaryFilter) {
            return function () {
                disactivate({ target: lastChosenDayEl.value, activeClasses })
            }
        }
    }

    return { toggleFilter, data: chosenDate }
}

export { useDateClickListener }
