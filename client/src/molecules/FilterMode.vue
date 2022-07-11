<script setup lang='ts'>
const props = defineProps<{
  initialCurrentMode: 'single' | 'multi'
}>()

const emit = defineEmits<{
  (e: 'updateMode', value: 'single' | 'multi'): void
}>()

const currentMode = ref(props.initialCurrentMode)

watch(currentMode, newMode => emit('updateMode', newMode))
</script>

<template>
  <fieldset class="bg-light-400 flex w-full justify-around">
    <legend class="bg-gray-900/80 px-2 ml-2 rounded">
      Choose day mode
    </legend>
    <input id="single-mode" v-model="currentMode" class="hidden" value="single" name="mode" type="radio">
    <label
      :class="{ 'mode--active border-r-4': currentMode === 'single', 'mode--passive': currentMode !== 'single' }"
      class="toggle-label ml-2 rounded-l-2xl border-3 border-r-0" for="single-mode"
    >Single day</label>

    <input id="multi-mode" v-model="currentMode" class="hidden" value="multi" name="mode" type="radio">
    <label
      :class="{ 'mode--active border-l-4': currentMode === 'multi', 'mode--passive': currentMode !== 'multi' }"
      class="toggle-label mr-2 rounded-r-2xl border-3 border-l-0" for="multi-mode"
    >Multi day</label>
  </fieldset>
</template>

<style lang='scss' scoped>
.toggle-label {
  @apply text-xl bg-light-50 text-black font-bold flex items-center justify-center w-full my-2 p-2 block text-center duration-300 transition-all;
}

.mode--active {
  @apply bg-sky-100/90 text-xl text-sky-600 border-sky-600;
}

.mode--passive {
  @apply opacity-20 hover: opacity-100 hover:scale-105 hover:cursor-pointer;
}
</style>
