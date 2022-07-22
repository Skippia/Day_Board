<script setup lang="ts">
    import { dayRadarParser } from '~/logic/DayRadarParser/core'
    const storeDatePicker = useStoreDatePicker()
    const dataset = ref([] as number[])
    const labels = ref([] as string[])

    const isSingleMode = computed(() => storeDatePicker.getFilterDate.start === storeDatePicker.getFilterDate.end)
    const currentDay = computed(() => storeDatePicker.getDaysByDate)
    const isRadarDataExist = computed(() => storeDatePicker.getDaysByDate.length > 0)

    watch(currentDay, (data) => {
        const { dataset: newDataset, labels: newLabels } = dayRadarParser(data)

        dataset.value = newDataset
        labels.value = newLabels
    })
</script>

<template>
    <div class="stats-day-chart__container grad">
        <date-picker-filter-date class="filter-date" :is-single-mode="isSingleMode"></date-picker-filter-date>
        <transition name="radar" mode="out-in">
            <v-radar-chart-wrapper v-if="isRadarDataExist" :dataset="dataset" :labels="labels"></v-radar-chart-wrapper>
        </transition>
        <transition name="notification-day" mode="out-in">
            <v-error-notification
                v-if="!isRadarDataExist"
                text-error="You don't have schedule for"
                icon-class="i-carbon:warning"
                font-size="250px"
            >
                <template #sub-text>
                    <span class="error-notification__subtext">
                        {{ isSingleMode ? 'this' : 'these' }}
                    </span>
                    {{ isSingleMode ? 'day' : 'days' }}
                </template>
            </v-error-notification>
        </transition>
    </div>
</template>

<style lang="scss" scoped>
    .stats-day-chart__container {
        @apply w-full h-full text-black  flex flex-col items-center justify-center;
    }
    .filter-date {
        @apply absolute top-10;
    }
    .error-notification__subtext {
        @apply text-red-500 font-medium border-pink-100/80 border-b-2 italic;
    }
</style>
