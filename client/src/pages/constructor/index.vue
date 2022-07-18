<script setup lang="ts">
    const arrayDraggable = [
        { name: 'Tomato 1-st', id: 1 },
        { name: 'English Walk', id: 2 },
        { name: 'Write down dream', id: 3 },
        { name: 'English grammar', id: 4 },
        { name: 'Wake up at 08:00', id: 5 },
        { name: 'Write down dream', id: 6 },
        { name: 'English grammar', id: 7 },
        { name: 'Tomato 2-st', id: 8 },
        { name: 'English Walk', id: 2 },
        { name: 'Write down dream', id: 3 },
        { name: 'English grammar', id: 4 },
        { name: 'Wake up at 08:00', id: 5 },
        { name: 'Write down dream', id: 6 },
        { name: 'English grammar', id: 7 },
        { name: 'Tomato 2-st', id: 8 },
        { name: 'English Walk', id: 2 },
        { name: 'Write down dream', id: 3 },
        { name: 'English grammar', id: 4 },
        { name: 'Wake up at 08:00', id: 5 },
        { name: 'Write down dream', id: 6 },
        { name: 'English grammar', id: 7 },
        { name: 'Tomato 2-st', id: 8 },
        { name: 'English Walk', id: 2 },
        { name: 'Write down dream', id: 3 },
        { name: 'English grammar', id: 4 },
        { name: 'Wake up at 08:00', id: 5 },
        { name: 'Write down dream', id: 6 },
        { name: 'English grammar', id: 7 },
        { name: 'Tomato 2-st', id: 8 },
    ]
</script>

<template>
    <constructor-overlay max-width="80%" max-height="80%">
        <div class="constructor">
            <h1 class="constructor__template-title">
                Hello to creating template calendar
                <span class="i-carbon:calendar-heat-map text-4xl"></span>
            </h1>
            <div class="top-wrapper">
                <constructor-tasks-module></constructor-tasks-module>
                <constructor-time-module></constructor-time-module>
            </div>

            <div class="badge-wrapper">
                <ConstructorDraggable :array-draggable="arrayDraggable">
                    <li class="badge bg-yellow/10" v-for="element in arrayDraggable" :key="element.id">
                        {{ element.name }}
                        <span class="close-badge i-carbon-close-outline"></span>
                    </li>
                </ConstructorDraggable>
            </div>
        </div>
    </constructor-overlay>
</template>

<style lang="scss" scoped>
    .constructor {
        @apply p-10 flex flex-col h-full justify-between items-center;
    }
    .constructor__template-title {
        @apply text-5xl flex items-center gap-3 mb-8;
    }
    .top-wrapper {
        width: fit-content;
        @apply flex flex-wrap justify-center border-2 gap-5 border-light-100 border-dashed rounded-lg p-5;
    }

    .close-badge {
        @apply text-white/50 text-2xl duration-300 hover:text-white hover:cursor-pointer hover:scale-120;
    }
    .badge {
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        @apply flex justify-center gap-5 items-center text-white px-3 py-2 text-xl inline-block rounded;
    }
    .badge-wrapper {
        @apply flex gap-5 flex-wrap p-5;
    }
</style>
