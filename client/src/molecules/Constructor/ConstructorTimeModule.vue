<script setup lang="ts"></script>

<template>
    <div class="constructor__time-wrapper">
        <h1 class="constructor__time-title subtitle">Time configurator</h1>

        <div class="time-configurator p-5">
            <div class="basis-1/2 flex flex-col">
                <label class="text-2xl" for="time-separator">Chose time range</label>
                <select class="time__separator" name="time-separator">
                    <option disabled default>Time separator</option>
                    <option value="240">4 hours</option>
                    <option value="120">2 hours</option>
                    <option value="60">1 hour</option>
                </select>
            </div>

            <div class="flex flex-col">
                <p class="text-2xl">Chose time range</p>
                <div class="flex gap-5">
                    <select class="time__separator" name="time-start">
                        <option selected="true" disabled>Start time</option>
                        <option value="240">4 hours</option>
                    </select>
                    <select class="time__separator" name="time-end">
                        <option selected disabled>End time</option>
                        <option value="240">4 hours</option>
                    </select>
                </div>
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
        @apply text-white px-3 py-2 text-2xl font-medium text-center bg-neutral-500/20;
    }
</style>
