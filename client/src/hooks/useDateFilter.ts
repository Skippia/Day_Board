import type { IDate } from '~/types/IDate'

const useDateFilter = () => {
  const storeDay = useStoreDay()
  const storeDayFilter = useStoreDayFilter()

  const getDateFilter = computed(() => storeDayFilter.getFilterDate)

  const filterDate = reactive({
    start: storeDayFilter.getFilterDate[0],
    end: storeDayFilter.getFilterDate[0],
  })

  function filterByDate(filterDate: { start: IDate; end: IDate }) {
    storeDay.filterDaysByDate({
      startDate: +convertDate(filterDate.start),
      endDate: +convertDate(filterDate.end) + 86399999,
    })
  }
  watch(getDateFilter, (dateFilter) => {
    if (dateFilter.length === 1) {
      filterDate.start = filterDate.end = dateFilter[0]
    }
    else if (dateFilter.length === 2) {
      filterDate.start = dateFilter[0]
      filterDate.end = dateFilter[1]
    }

    filterByDate(filterDate)
  })

  return { filterDate, filterByDate }
}

export { useDateFilter }
