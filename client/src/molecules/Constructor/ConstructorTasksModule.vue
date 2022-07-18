<script setup lang="ts"></script>

<template>
    <div class="wrapper">
        <div class="constructor__tasks">
            <h1 class="constructor__tasks-title subtitle">Tasks constructor</h1>
            <p class="text-2xl opacity-70 mt-6">Add task</p>
            <div class="flex items-center gap-5">
                <VInput
                    type="text"
                    :classes="'time__separator bg-neutral-500/20 border-slate-200'"
                    name="new-task"
                    placeholder="Task name..."
                />
                <span
                    class="i-carbon-add-alt text-white/50 duration-300 hover:cursor-pointer hover:text-white text-5xl"
                ></span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .wrapper {
        @apply flex flex-col border-2 p-5;
    }
    .time__separator {
        width: fit-content;
        @apply text-white p-2 text-xl font-medium p-2 rounded shadow-md text-white;
    }
</style>
