<script setup lang="ts">
    import type { ChartData, ChartOptions } from 'chart.js'
    import { Chart, registerables } from 'chart.js'
    import { RadarChart, useRadarChart } from 'vue-chart-3'

    const props = defineProps<{
        dataset: number[]
        labels: string[]
    }>()

    const getLabels = computed(() => props.labels)
    const getDataset = computed(() => props.dataset)

    //* For radar animation
    let delayed = false

    Chart.register(...registerables)

    const radarData = computed<ChartData<'radar'>>(() => ({
        labels: getLabels.value,
        datasets: [
            {
                label: ' Frequency',
                color: '#fff',
                borderWidth: 2, // border width
                backgroundColor: 'rgba(165, 211, 164, 0.2)',
                borderColor: 'rgb(165, 211, 164)',
                pointBackgroundColor: 'rgb(165, 211, 164)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                data: getDataset.value,
            },
        ],
    }))

    const { radarChartProps } = useRadarChart({
        chartData: radarData,
        height: 600,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: '#fff',
                    },
                },
                tooltip: {
                    callbacks: {
                        // @ts-expect-error works
                        label: (ctx) => {
                            return ` Percentage complete : ${ctx.raw}%`
                        },
                    },
                },
            },
            scales: {
                r: {
                    ticks: {
                        callback() {
                            return ''
                        },
                        backdropColor: 'rgba(0, 0, 0, 0)',
                        maxTicksLimit: 6,
                    },
                    grid: {
                        color: 'rgba(22,22,22,0.5)',
                    },
                    pointLabels: {
                        color: 'rgb(255,255,255,0.9)',
                        font: {
                            size: 13,
                        },
                    },
                },
            },
            animation: {
                onComplete: () => {
                    delayed = true
                },
                delay: (context: { type: string; mode: string; dataIndex: number; datasetIndex: number }) => {
                    let delay = 0
                    if (context.type === 'data' && context.mode === 'default' && !delayed)
                        delay = context.dataIndex * 100 + context.datasetIndex * 100

                    return delay
                },
            },
        },
    })
</script>

<template>
    <RadarChart v-bind="radarChartProps" />
</template>

<style></style>
