const convertDate = (
  { year, month, day }:
  { year: number; month: number; day: number }) => new Date(year, month, day)

const compareDateMY = (currentDate: { month: number; year: number }, chosenDate: { day: number; month: number; year: number }) =>
  currentDate.month === chosenDate.month && currentDate.year === chosenDate.year

const prettyDate = (date: Date) => new Date(date).toLocaleString('en-us', { month: 'long', year: 'numeric' })

const currentDate = reactive({
  day: new Date().getDate(),
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
})

export { convertDate, compareDateMY, prettyDate, currentDate }
