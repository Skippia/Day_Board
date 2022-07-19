<script setup lang="ts">
    interface Props {
        name: string
        label: string
        fontSize?: string
        color?: string
    }
    const props = withDefaults(defineProps<Props>(), {
        fontSize: '14px',
        color: 'rgba(209, 213, 219)',
    })
</script>

<template>
    <label class="label-input" :for="name">{{ label }}</label>
</template>

<style lang="scss" scoped>
    .label-input {
        @apply self-start font-bold;
    }
</style>
