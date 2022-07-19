<script setup lang="ts"></script>

<template>
    <p class="rotate-transform__text px-2 text-sm">
        <slot />
    </p>
</template>

<style lang="scss" scoped>
    .rotate-transform__text {
        text-align: center;
        writing-mode: vertical-lr;
        transform: rotateZ(-170deg);
        white-space: pre;
    }
</style>
