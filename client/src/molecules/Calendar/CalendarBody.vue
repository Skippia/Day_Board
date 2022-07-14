<script setup lang='ts'>
import type { Ref } from 'vue'
import { daysWeek } from '~/utils/constants'
const props = defineProps<{
  isRenderedElement: boolean
  getAmountDaysInCurrentMonth: number
  changeDay: (e: MouseEvent) => void
}>()

const emit = defineEmits<{
  (e: 'updateStateRenderedEl', value: HTMLElement | undefined): void
}>()

const renderedElement = ref<HTMLElement>()

watch((renderedElement), (renderedEl) => {
  emit('updateStateRenderedEl', renderedEl)
})
</script>

<template>
  <main class="flex flex-col p-4 w-full">
    <div class="flex justify-between">
      <p v-for="dayWeek in daysWeek" :key="dayWeek" class="text-black font-bold">
        {{ dayWeek }}
      </p>
    </div>
    <Transition name="list" appear mode="out-in">
      <div v-if="isRenderedElement" ref="renderedElement" class="data-row">
        <p v-for="day in getAmountDaysInCurrentMonth" :key="day" class="data-el" :data-day="day" @click="changeDay">
          {{ day }}
        </p>
      </div>
    </Transition>
  </main>
</template>

<style lang='scss' scoped>
.data-row {
  @apply flex flex-wrap;
  --gap: 0.5em;
  --columns: 7;
  gap: var(--gap);
}

.data-el {
  @apply flex text-black items-center justify-center rounded-[100%] p-4 transition-all;
  width: calc((100% / var(--columns)) - var(--gap) + (var(--gap) / var(--columns)));
}

.data-el:hover {
  background: rgba(22, 22, 22, 0.1);
  outline: thick double #32a1ce;
  cursor: pointer;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
