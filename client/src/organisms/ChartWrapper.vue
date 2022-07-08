<script setup lang='ts'>
const storeDay = useStoreDay()

const convertDate = (rawDate: string) => +new Date(rawDate)
//* ? Loading current page data
storeDay.loadAllPageData()
const getDays = computed(() => storeDay.allPageData)
const getFilteredDaysByDate = computed(() => storeDay.getFilteredDaysByDate)

const dateGenerate = ref('2022,6,8')

const startDate = ref('2022,6,1')
const endDate = ref('2022,6,30')

function filterDaysByDate() {
  console.log('Start filtering...')

  storeDay.filterDaysByDate({
    startDate: convertDate(startDate.value),
    endDate: convertDate(endDate.value),
  })
}

function generateDay() {
  const listTimes = [String(Math.random() * 1000)]
  const listTasks = [String(Math.random() * 1000)]
  const additionalUrlParams = `/${+new Date(dateGenerate.value)}`
  storeDay.createDay({ listTimes, listTasks, additionalUrlParams })
}
</script>

<template>
  <div class="w-full h-full text-black flex flex-col items-center bg-emerald-500/70">
    <button class="p-5 my-3 bg-indigo-800/50 mx-auto text-white rounded-full shadow-md" @click="generateDay">
      Generate Day
    </button>
    <input v-model="dateGenerate" placeholder="yyyy,mm-1,dd">
    <button class="p-5 my-3 bg-rose-400/90 mx-auto text-white rounded-full shadow-md" @click="filterDaysByDate">
      Filter by date
    </button>
    <input v-model="startDate" placeholder="yyyy,mm-1,dd">
    <input v-model="endDate" placeholder="yyyy,mm-1,dd">
    <br>
    <div v-for="day in getFilteredDaysByDate" border="~ 2 pink-300" my-2>
      {{ day }}
    </div>
  </div>
</template>

<style lang='scss' scoped>
</style>
