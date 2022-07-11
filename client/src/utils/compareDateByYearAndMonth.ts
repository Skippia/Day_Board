function compareDateByMonthAndYear(currentDate: { month: number; year: number }, chosenDate: { day: number; month: number; year: number }) {
  return currentDate.month === chosenDate.month && currentDate.year === chosenDate.year
}

export { compareDateByMonthAndYear }
