<script setup lang='ts'>
const props = defineProps<{
  isSingleMode: boolean
}>()
const storeDatePicker = useStoreDatePicker()
const getFilterDate = computed(() => storeDatePicker.getFilterDate)

const leftEdge = computed(() => DATE.prettyDate(storeDatePicker.getFilterDate.start, { day: true }))
const rightEdge = computed(() => DATE.prettyDate(storeDatePicker.getFilterDate.end, { day: true }))
</script>

<template>
  <p class="calendar-stats bg-neutral-900/80">
    <template v-if="!isSingleMode">
      {{ leftEdge }} <i class="gg-arrow-long-right" /> {{ rightEdge }}
    </template>
    <template v-else>
      {{ leftEdge }}
    </template>
  </p>
</template>

<style lang='scss' scoped>
.calendar-stats {
  @apply text-white text-4xl gap-5 justify-between flex px-5 rounded items-center;
}
.gg-arrow-long-right {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs,1));
    border-top: 2px solid transparent;
    border-bottom: 2px solid transparent;
    box-shadow: inset 0 0 0 2px;
    width: 44px;
    height: 6px;
}
.gg-arrow-long-right::after {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 6px;
    height: 6px;
    border-top: 2px solid;
    border-right: 2px solid;
    transform: rotate(45deg);
    right: 0;
    bottom: -2px
}
</style>
