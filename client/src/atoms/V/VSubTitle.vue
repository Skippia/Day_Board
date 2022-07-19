<script setup lang="ts">
    interface Props {
        iconClass?: string
        fontSize?: string
        color?: string
        underline?: boolean
    }
    const props = withDefaults(defineProps<Props>(), {
        fontSize: '30px',
        color: 'rgba(209, 213, 219)',
        underline: false,
    })
</script>

<template>
    <p class="title" :class="{ 'border-b-2': props.underline }">
        <slot />
        <span v-if="iconClass" :class="iconClass" class="icon"></span>
    </p>
</template>

<style lang="scss" scoped>
    .title {
        font-size: v-bind(fontSize);
        color: v-bind(color);
        width: fit-content;
        @apply flex items-center gap-2;
    }
    .icon {
        font-size: v-bind(fontSize);
        color: v-bind(color);
    }
</style>
