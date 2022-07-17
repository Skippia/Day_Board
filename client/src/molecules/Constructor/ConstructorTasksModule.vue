<script setup lang="ts"></script>

<template>
    <div class="wrapper">
        <div class="constructor__tasks">
            <h1 class="constructor__tasks-title subtitle">Tasks constructor</h1>
            <p class="text-2xl opacity-70 mt-6">Add task</p>
            <div class="flex items-center gap-5">
                <input type="text" name="new-task" id="new-task" placeholder="Task name..." class="time__separator" />
                <span
                    class="i-carbon-add-alt text-white/50 duration-300 hover:cursor-pointer hover:text-white text-5xl"
                ></span>
            </div>
        </div>
        <div class="badge-wrapper border-2 border-emerald-300/90 h-50 mt-5">
            <div class="badge">
                Wake up at 08:00
                <span class="close-badge"></span>
            </div>
            <div class="badge">Pomidor 1-st</div>
            <div class="badge">English Walk</div>
            <div class="badge">Write down dream</div>
            <div class="badge">English grammar</div>
            <div class="badge">Wake up at 08:00</div>
            <div class="badge">Pomidor 1-st</div>
            <div class="badge">English Walk</div>
            <div class="badge">Write down dream</div>
            <div class="badge">English grammar</div>
            <div class="badge">Wake up at 08:00</div>
            <div class="badge">Pomidor 1-st</div>
            <div class="badge">English Walk</div>
            <div class="badge">Write down dream</div>
            <div class="badge">English grammar</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .wrapper {
        @apply flex flex-col border-2 p-5;
    }
    .time__separator {
        @apply text-white w-fit px-3 py-2 text-2xl font-medium text-center bg-neutral-500/20;
    }
    .badge-wrapper {
        @apply flex gap-5 flex-wrap p-5;
    }
    .badge {
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        @apply flex justify-center gap-5 items-center text-white px-3 py-2 text-xl bg-yellow/10 inline-block rounded;
    }
    .close-badge {
        @apply close-badge i-carbon-close-outline text-white/50 text-2xl duration-300 hover:text-white hover:cursor-pointer hover:scale-120;
    }
</style>
