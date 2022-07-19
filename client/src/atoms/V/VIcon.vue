<script setup lang="ts">
    interface Props {
        color?: string
        fontSize?: string
        iconClass: string
    }

    const props = withDefaults(defineProps<Props>(), {
        color: 'rgba(255, 255,255,1)',
        fontSize: '25px',
    })
</script>

<template>
    <span :class="iconClass" class="icon"></span>
</template>

<style lang="scss" scoped>
    .icon {
        font-size: v-bind(fontSize);
        color: v-bind(color);
        @apply opacity-70 duration-300 hover:opacity-100 hover:cursor-pointer hover:scale-120;
    }
</style>
