const currentDate = reactive({
  day: new Date().getDate(),
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
})

export { currentDate }
