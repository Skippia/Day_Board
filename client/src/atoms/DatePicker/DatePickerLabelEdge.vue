<script setup lang="ts">
    interface Props {
        fontSize?: string
        color?: string
    }
    const props = withDefaults(defineProps<Props>(), {
        fontSize: '36px',
        color: 'white',
    })
</script>

<template>
    <p class="date-picker-label-edge bg-neutral-900/80">
        <slot />
    </p>
</template>

<style lang="scss" scoped>
    .date-picker-label-edge {
        font-size: v-bind(fontSize);
        color: v-bind(color);
        @apply flex items-center gap-5 px-5 rounded;
    }
</style>
