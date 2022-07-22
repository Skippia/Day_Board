<script setup lang="ts">
    interface Props {
        type?: 'button' | 'submit' | 'reset'
        color?: string
        bgColor?: string
        fontSize?: string
    }

    const props = withDefaults(defineProps<Props>(), {
        type: 'button',
        color: 'white',
        bgColor: 'rgba(22, 22, 22, 0.9)',
        fontSize: '30px',
    })
</script>

<template>
    <button class="btn" :type="type">
        <slot />
    </button>
</template>

<style lang="scss" scoped>
    .btn {
        color: v-bind(color);
        background-color: v-bind(bgColor);
        font-size: v-bind(fontSize);
        border-width: 2px;
        border-color: v-bind(color);
        @apply opacity-[50%] hover:opacity-[80%] hover:scale-90 duration-300 font-medium py-3 rounded px-16;
    }

    .btn:focus {
        outline: 2px solid rgba(255, 255, 255, 0.8) !important;
    }
</style>
