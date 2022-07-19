<script setup lang="ts"></script>

<template>
    <p class="date-picker-day-cell">
        <slot />
    </p>
</template>

<style lang="scss" scoped>
    .date-picker-day-cell {
        @apply flex text-black items-center justify-center rounded-[100%] p-4 transition-all;
    }
</style>
