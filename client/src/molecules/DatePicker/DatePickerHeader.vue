<script setup lang="ts">
    import { months } from '~/utils/constants'
    const props = defineProps<{
        switchPreviousMonth: (e: Event) => void
        switchNextMonth: (e: Event) => void
    }>()

    const storeDatePicker = useStoreDatePicker()
    const getCurrentDate = computed(() => storeDatePicker.getCurrentDate)
</script>

<template>
    <header class="date-picker-header__container">
        <v-icon @click="switchPreviousMonth" font-size="36px" icon-class="i-carbon:chevron-left"></v-icon>
        <p class="text-white text-4xl">{{ months[getCurrentDate.month] }} {{ getCurrentDate.year }}</p>
        <v-icon @click="switchNextMonth" font-size="36px" icon-class="i-carbon:chevron-right"></v-icon>
    </header>
</template>

<style lang="scss" scoped>
    .date-picker-header__container {
        @apply flex justify-between items-center w-full h-2em p-7 bg-dark-900/80;
    }
</style>
