<script setup lang="ts"></script>

<template>
    <p class="date-picker-week-cell">
        <slot />
    </p>
</template>

<style lang="scss" scoped>
    .date-picker-week-cell {
        @apply w-full text-center text-black font-bold;
    }
</style>
