<script setup lang="ts">
    import { useSelect } from '~/logic/useSelect'

    const timeSeparatorOptions = [
        { name: '4 hours', value: '240' },
        { name: '2 hours', value: '120' },
        { name: '1 hours', value: '60' },
    ]
    const startRangeOptions = [
        { name: '06:00', value: '06' },
        { name: '07:00', value: '07' },
        { name: '08:00', value: '08' },
        { name: '09:00', value: '09' },
        { name: '10:00', value: '10' },
        { name: '11:00', value: '11' },
        { name: '12:00', value: '12' },
    ]
    const endRangeOptions = [
        { name: '16:00', value: '16' },
        { name: '17:00', value: '17' },
        { name: '18:00', value: '18' },
    ]

    const { isOpen: isOpenTimeSeparator, methodsSelect: methodsTimeSeparator } = useSelect()
    const { isOpen: isOpenStartRange, methodsSelect: methodsStartRange } = useSelect()
    const { isOpen: isOpenEndRange, methodsSelect: methodsEndRange } = useSelect()

    const timeSeparator = ref('Chose separator')
    const startRange = ref('Start date...')
    const endRange = ref('End date...')

    watch(timeSeparator, (newVal: string) => console.log(newVal))
</script>

<template>
    <div class="constructor__time-wrapper">
        <h1 class="constructor__time-title subtitle">Time configurator</h1>

        <div class="flex gap-2">
            <div class="flex flex-col">
                <p class="text-sm text-green-100/50">time separator</p>
                <VSelect
                    v-model="timeSeparator"
                    :model-value="timeSeparator"
                    :is-open="isOpenTimeSeparator"
                    :options="timeSeparatorOptions"
                    :methods="methodsTimeSeparator"
                    :select-classes="'bg-sky-600/40 text-center rounded-t-xl p-3 text-white font-medium text-xl hover:bg-sky/70 hover:cursor-pointer'"
                    :option-classes="'bg-light-800 py-3 text-xl text-black border-2 rounded-lg my-2 text-center hover:bg-black-900/90 hover:text-white/90 hover:cursor-pointer'"
                ></VSelect>
            </div>
            <div class="flex flex-col">
                <p class="text-sm text-green-100/50">start day</p>
                <VSelect
                    v-model="startRange"
                    :model-value="startRange"
                    :is-open="isOpenStartRange"
                    :options="startRangeOptions"
                    :methods="methodsStartRange"
                    :select-classes="'bg-sky-600/40 text-center rounded-t-xl p-2 text-white font-medium text-xl hover:bg-sky/70 hover:cursor-pointer'"
                    :option-classes="'bg-light-800 py-1 text-xl text-black border-2 rounded-lg my-1 text-center hover:bg-black-900/90 hover:text-white/90 hover:cursor-pointer'"
                ></VSelect>
            </div>

            <div class="flex flex-col">
                <p class="text-sm text-green-100/50">start day</p>
                <VSelect
                    v-model="endRange"
                    :model-value="endRange"
                    :is-open="isOpenEndRange"
                    :options="endRangeOptions"
                    :methods="methodsEndRange"
                    :select-classes="'bg-sky-600/40 text-center rounded-t-xl p-3 text-white font-medium text-xl hover:bg-sky/70 hover:cursor-pointer'"
                    :option-classes="'bg-light-800 py-1 text-xl text-black border-2 rounded-lg my-1 text-center hover:bg-black-900/90 hover:text-white/90 hover:cursor-pointer'"
                ></VSelect>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .constructor__time-wrapper {
        @apply border-2 p-5;
    }
    .constructor__time-title {
    }
    .time-configurator {
        @apply flex justify-between items-center gap-5;
    }
    .time__separator {
        @apply text-white px-3 py-2 text-2xl font-medium text-center;
    }
</style>
