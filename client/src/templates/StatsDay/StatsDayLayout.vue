<script setup lang="ts">
    const props = defineProps<{
        statsDayChart: {
            width: string
        }
        statsDayAsidePanel: {
            width: string
        }
    }>()

    const statsDayChart = ref(props.statsDayChart.width)
    const statsDayAsidePanel = ref(props.statsDayAsidePanel.width)
</script>

<template>
    <div class="stats-day__container">
        <div class="stats-day-chart__container grad">
            <slot name="stats-day-chart" />
        </div>

        <div class="stats-day-aside-panel__container bg-white/90">
            <slot name="stats-day-aside-panel" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .stats-day__container {
        @apply flex gap-1em h-screen p-10;
    }
    .stats-day-chart__container {
        width: v-bind(statsDayChart);
        overflow: auto;
    }
    .stats-day-aside-panel__container {
        width: v-bind(statsDayAsidePanel);
        overflow: auto;
    }

    .grad {
        background-image: linear-gradient(to right top, #051937, #222840, #38394a, #4b4b54, #5e5e5e);
    }
</style>
