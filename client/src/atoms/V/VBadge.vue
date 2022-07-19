<script setup lang="ts">
    interface Props {
        color?: string
        bgColor?: string
        fontSize?: string
    }

    const props = withDefaults(defineProps<Props>(), {
        bgColor: 'rgba(214, 225, 48, 0.5)',
        fontSize: '20px',
        color: 'rgba(255, 255,255,1)',
    })
</script>

<template>
    <div class="badge">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
    .badge {
        color: v-bind(color);
        background-color: v-bind(bgColor);
        font-size: v-bind(fontSize);
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        @apply flex justify-center gap-3 items-center duration-300 px-2 py-2
        inline-block rounded opacity-60 hover:cursor-pointer hover:opacity-100;
    }
</style>
