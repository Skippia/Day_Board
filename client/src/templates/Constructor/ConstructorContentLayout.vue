<script setup lang="ts"></script>

<template>
    <slot name="c-title" />

    <div class="configurator__container">
        <slot name="c-modules"></slot>
    </div>

    <div class="draggable__container">
        <slot name="c-draggable" />
    </div>
</template>

<style lang="scss" scoped>
    .configurator__container {
        @apply flex flex-wrap h-full w-full justify-center border-2 gap-5 border-red-900 border-dashed rounded-lg p-5;
    }
    .draggable__container {
        @apply flex flex-wrap w-full h-full border-2 border-blue-500 gap-5  p-5;
    }
</style>
