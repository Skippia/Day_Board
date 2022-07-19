<script setup lang="ts">
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

    watch(renderedElement, (renderedEl) => {
        emit('updateStateRenderedEl', renderedEl)
    })
</script>

<template>
    <main class="date-picker-body__container">
        <div class="date-picker-body__week">
            <date-picker-week-cell v-for="dayWeek in daysWeek" :key="dayWeek">
                {{ dayWeek }}
            </date-picker-week-cell>
        </div>
        <Transition name="list" appear mode="out-in">
            <div v-if="isRenderedElement" ref="renderedElement" class="day-row">
                <date-picker-day-cell
                    v-for="day in getAmountDaysInCurrentMonth"
                    :key="day"
                    class="day-cell-width"
                    :data-day="day"
                    @click="changeDay"
                >
                    {{ day }}
                </date-picker-day-cell>
            </div>
        </Transition>
    </main>
</template>

<style lang="scss" scoped>
    .date-picker-body__container {
        @apply flex flex-col p-4 w-full overflow-hidden;
    }
    .date-picker-body__week {
        @apply flex justify-between;
    }
    .day-row {
        @apply flex flex-wrap;
        --gap: 0.5em;
        --columns: 7;
        gap: var(--gap);
    }
    .day-cell-width {
        width: calc((100% / var(--columns)) - var(--gap) + (var(--gap) / var(--columns)));
    }

    .day-cell-width:hover {
        background: rgba(22, 22, 22, 0.1);
        outline: thick double #32a1ce;
        cursor: pointer;
    }
</style>
