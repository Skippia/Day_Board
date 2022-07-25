import type { IFullDate } from '~/types/types'

const DATE = {
    convertDate: ({ year, month, day }: { year: number; month: number; day: number }) => new Date(year, month, day),
    compareDateMY: (currentDate: { month: number; year: number }, chosenDate: IFullDate) =>
        currentDate.month === chosenDate.month && currentDate.year === chosenDate.year,
    prettyDate: (date: number, options?: { day: boolean }) => {
        if (options?.day)
            return new Date(date).toLocaleString('en-us', {
                month: 'long',
                year: 'numeric',
                day: 'numeric',
            })

        return new Date(date).toLocaleString('en-us', {
            month: 'long',
            year: 'numeric',
        })
    },
    getStartDate: (timestamp: number) => {
        const startFullDate = new Date(timestamp)
        const startY = startFullDate.getFullYear()
        const startM = startFullDate.getMonth()
        const startD = startFullDate.getDate()
        return +new Date(startY, startM, startD)
    },
    getEndDate: (timestamp: number) => {
        const startFullDate = new Date(timestamp)
        const startY = startFullDate.getFullYear()
        const startM = startFullDate.getMonth()
        const startD = startFullDate.getDate()
        return +new Date(startY, startM, startD) + 86399999
    },
    sortByDateAsc: (array: { date: Date }[]) => {
        if (!array) return []
        return array.sort((a: { date: Date }, b: { date: Date }) =>
            +new Date(a.date) - +new Date(b.date) > 0 ? 1 : -1
        )
    },
    getParseZeroTime: (time: string) => (time.length === 1 ? `0${time}` : time),
    getHoursAndMins(time: number) {
        const hours = Math.floor(time / 60)
        const minutes = time % 60
        return { hours, minutes }
    },
    createTimeSchedule: (start: number, end: number, timeSeparator: number) => {
        const listTimes: string[] = []
        const amountIteration = ((end - start) * 60) / timeSeparator

        const { hours: addHours, minutes: addMinutes } = DATE.getHoursAndMins(timeSeparator)
        let endHour = 0
        let endMinutes = 0

        for (let i = 0; i < amountIteration; i++) {
            const startHour = i !== 0 ? endHour : start
            endHour = startHour + addHours

            const startMinutes = i !== 0 ? endMinutes : i
            endMinutes = startMinutes + addMinutes

            const startBias = DATE.getHoursAndMins(startMinutes)
            const endBias = DATE.getHoursAndMins(endMinutes)

            const startHoursRes = DATE.getParseZeroTime(`${startHour + startBias.hours}`)
            const startMinsRes = DATE.getParseZeroTime(`${startBias.minutes}`)

            const endHoursRes = DATE.getParseZeroTime(`${endHour + endBias.hours}`)
            const endMinsRes = DATE.getParseZeroTime(`${endBias.minutes}`)

            const startInterval = `${startHoursRes}:${startMinsRes}`
            const endInterval = `${endHoursRes}:${endMinsRes}`

            listTimes.push(`${startInterval} - ${endInterval}`)
        }

        if (listTimes.length === 0) {
            return []
        }
        const last = listTimes.at(-1)?.split(' - ') as string[]
        last[1] = DATE.getParseZeroTime(`${end}:00`)
        listTimes[listTimes.length - 1] = last.join(' - ')
        return listTimes
    },
}

export { DATE }
