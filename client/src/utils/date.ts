const convertDate = (
  { year, month, day }:
  { year: number; month: number; day: number }) => new Date(year, month, day)

const compareDateMY = (currentDate: { month: number; year: number }, chosenDate: IFullDate) =>
  currentDate.month === chosenDate.month && currentDate.year === chosenDate.year

const prettyDate = (date: Date) => new Date(date).toLocaleString('en-us', { month: 'long', year: 'numeric' })

export { convertDate, compareDateMY, prettyDate }
