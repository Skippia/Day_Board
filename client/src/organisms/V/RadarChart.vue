<script setup lang='ts'>
import { RadarChart, useRadarChart } from 'vue-chart-3'
import type { ChartData, ChartOptions } from 'chart.js'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)
const toggleLegend = ref(true)

const getRandomDate = () => new Array(17).fill('*').map(el => Math.round(Math.random() * 100))

const randomDate = ref(getRandomDate())

setInterval(() => {
  // randomDate.value = getRandomDate()
}, 5000)

const testData = computed<ChartData<'radar'>>(() => ({
  labels: [
    'Wake Up',
    'Write Down Dreams',
    'HP & LS',
    '1-st pomidor',
    '1-st biceps training',
    'English Grammar',
    '2-st pomidor',
    '2-st biceps training',
    '3-st pomidor',
    '3-st biceps training',
    '4-st pomidor',
    '4-st biceps training',
    'Second eating',
    'English Reading',
    'Blind Typing',
    'English Walk',
    'SProgramming',
  ],
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
      data: randomDate.value,
    },
  ],
}))

let delayed = false

const { radarChartProps, radarChartRef } = useRadarChart({
  chartData: testData,
  height: 500,
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
          callback() { return '' },
          backdropColor: 'rgba(0, 0, 0, 0)',
          maxTicksLimit: 6,
        },
        grid: {
          color: 'rgba(22,22,22,0.5)',
        },
        pointLabels: {
          color: 'rgb(255,255,255,0.9)',
          font: {
            size: 11,
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
  <div class="w-full h-full">
    <div style="display: flex; justify-content: center" />
    <RadarChart v-bind="radarChartProps" />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
