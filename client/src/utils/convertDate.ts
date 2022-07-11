const convertDate = (
  { year, month, day }:
  { year: number; month: number; day: number }) => new Date(year, month, day)

export { convertDate }
