<script setup lang="ts">
    import { timeSeparatorOptions, startRangeOptions, endRangeOptions } from '~/utils/constants'

    const { isOpen: isOpenTimeSeparator, methodsSelect: methodsTimeSeparator } = useVSelect()
    const { isOpen: isOpenStartRange, methodsSelect: methodsStartRange } = useVSelect()
    const { isOpen: isOpenEndRange, methodsSelect: methodsEndRange } = useVSelect()

    const timeSeparator = ref('Chose separator')
    const startRange = ref('Start date...')
    const endRange = ref('End date...')
</script>

<template>
    <div class="c-time-module__container">
        <v-sub-title underline>Time configurator</v-sub-title>

        <div class="c-time-module__selects-wrapper">
            <div class="c-time-module__select">
                <v-sub-title font-size="14px" color="rgba(209, 250, 229,0.5)">time separator</v-sub-title>
                <v-select
                    v-model="timeSeparator"
                    :model-value="timeSeparator"
                    :is-open="isOpenTimeSeparator"
                    :options="timeSeparatorOptions"
                    :methods="methodsTimeSeparator"
                >
                </v-select>
            </div>

            <div class="c-time-module__select">
                <v-sub-title font-size="14px" color="rgba(209, 250, 229,0.5)">start day</v-sub-title>
                <v-select
                    v-model="startRange"
                    :model-value="startRange"
                    :is-open="isOpenStartRange"
                    :options="startRangeOptions"
                    :methods="methodsStartRange"
                    option-padding="3px"
                ></v-select>
            </div>

            <div class="c-time-module__select">
                <v-sub-title font-size="14px" color="rgba(209, 250, 229,0.5)">end day</v-sub-title>
                <v-select
                    v-model="endRange"
                    :model-value="endRange"
                    :is-open="isOpenEndRange"
                    :options="endRangeOptions"
                    :methods="methodsEndRange"
                    option-padding="3px"
                ></v-select>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .c-time-module__container {
        @apply flex flex-col justify-between border-2 p-5;
    }
    .c-time-module__selects-wrapper {
        @apply flex gap-4;
    }
    .c-time-module__select {
        @apply flex flex-col;
    }
</style>
