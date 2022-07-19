<script setup lang="ts">
    interface Props {
        iconClass?: string
        fontSize?: string
        color?: string
        text: string
    }
    const props = withDefaults(defineProps<Props>(), {
        fontSize: '48px',
        color: 'rgba(209, 213, 219)',
    })
</script>

<template>
    <h1 class="title">
        {{ text }}
        <span v-if="iconClass" :class="iconClass" class="icon"></span>
    </h1>
</template>

<style lang="scss" scoped>
    .title {
        font-size: v-bind(fontSize);
        color: v-bind(color);
        @apply flex items-center gap-3;
    }
    .icon {
        font-size: v-bind(fontSize);
        color: v-bind(color);
    }
</style>
