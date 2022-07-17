<script setup lang="ts">
    const props = defineProps({
        width: {
            type: String,
            default: '90%',
        },
        height: {
            type: String,
            default: '90%',
        },
        bgColor: {
            type: String,
            default: 'rgba(22,22,22,0.5)',
        },
    })
</script>

<template>
    <div class="constructor-overlay">
        <div class="constructor-overlay__content">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .constructor-overlay {
        @apply w-full h-screen flex flex-col items-center justify-center;
    }

    .constructor-overlay__content {
        width: v-bind(width);
        height: v-bind(height);
        background-color: v-bind(bgColor);
    }
</style>
