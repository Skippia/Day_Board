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
    <div class="constructor__container">
        <v-title icon-class="i-carbon:calendar-heat-map" text="Hello to creating template calendar"></v-title>

        <div class="configurator__container">
            <constructor-tasks-module></constructor-tasks-module>
            <constructor-time-module></constructor-time-module>
        </div>

        <div class="draggable__container">
            <v-draggable :array-draggable="arrayDraggable">
                <v-badge v-for="element in arrayDraggable" :key="element.id">
                    {{ element.name }}
                    <v-icon icon-class="i-carbon-close-outline"></v-icon>
                </v-badge>
            </v-draggable>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .constructor__container {
        @apply flex flex-col h-full w-full justify-between gap-5 p-3 items-center rounded-2xl overflow-auto;
    }
    .configurator__container {
        @apply flex flex-wrap justify-center border-2 gap-5 border-light-100 border-dashed rounded-lg p-5;
    }
    .draggable__container {
        @apply flex flex-wrap p-5;
    }
</style>
