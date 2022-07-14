import type { IFullDate } from '~/types/types'

const DATE = {
  convertDate: (
    { year, month, day }:
    { year: number; month: number; day: number }) => new Date(year, month, day),
  compareDateMY: (currentDate: { month: number; year: number }, chosenDate: IFullDate) =>
    currentDate.month === chosenDate.month && currentDate.year === chosenDate.year,
  prettyDate: (date: number, options?: { day: boolean }) => {
    if (options?.day)
      return new Date(date).toLocaleString('en-us', { month: 'long', year: 'numeric', day: 'numeric' })

    return new Date(date).toLocaleString('en-us', { month: 'long', year: 'numeric' })
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
    if (!array)
      return []
    return array.sort((a: { date: Date }, b: { date: Date }) => +new Date(a.date) - +new Date(b.date) > 0 ? 1 : -1)
  },
}

export { DATE }
