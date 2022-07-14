<script setup lang='ts'>
import { dayRadarParser } from '~/logic/DayRadarParser/core'
const storeDatePicker = useStoreDatePicker()
const dataset = ref([] as number[])
const labels = ref([] as string[])

const isSingleMode = computed(() => storeDatePicker.getFilterDate.start === storeDatePicker.getFilterDate.end)

const currentDay = computed(() => storeDatePicker.getDaysByDate)

watch(currentDay, (data) => {
  const { dataset: newDataset, labels: newLabels } = dayRadarParser(data)

  dataset.value = newDataset
  labels.value = newLabels
})

const isRadarDataExist = computed(() => storeDatePicker.getDaysByDate.length > 0)
</script>

<template>
  <div class="w-radar grad">
    <CalendarStats class="filter-date" :is-single-mode="isSingleMode" />
    <transition name="radar" mode="out-in">
      <RadarChart v-if="isRadarDataExist" class="w-full" :dataset="dataset" :labels="labels" />
    </transition>
    <transition name="notification-day" mode="out-in">
      <ErrorNotification :is-render="isRadarDataExist" text-error="You don't have schedule for">
        <template #sub-text>
          <span class="error-notification__subtext">
            {{ isSingleMode ? 'this' : 'these' }}
          </span>
          {{ isSingleMode ? 'day' : 'days' }}
        </template>
      </ErrorNotification>
    </transition>
  </div>
</template>

<style lang='scss' scoped>
@import '~/assets/styles/transitionAnimation.scss';

.w-radar {
  @apply w-full h-full text-black  flex flex-col items-center justify-center;
}
.filter-date {
  @apply absolute top-10;
}
.grad {
  background-image: linear-gradient(to right top, #051937, #222840, #38394a, #4b4b54, #5e5e5e);
}

.error-notification__subtext {
  @apply text-red-500 font-medium border-pink-100/80 border-b-2 italic;
}
</style>
