<script setup lang="ts">
    interface Props {
        minWidth?: string
        maxWidth?: string
        minHeight?: string
        maxHeight?: string
        bgColor?: string
    }
    const props = withDefaults(defineProps<Props>(), {
        minWidth: '50%',
        maxWidth: '90%',
        minHeight: '65%',
        maxHeight: '85%',
        bgColor: 'rgba(22,22,22,0.6)',
    })
</script>

<template>
    <div class="constructor__container">
        <div class="constructor-content__layout rounded-2xl">
            <slot name="constructor-content" />
        </div>
        <slot name="button-save" />
    </div>
</template>

<style lang="scss" scoped>
    .constructor__container {
        @apply w-full h-screen flex flex-col gap-5 justify-center items-center;
    }
    .constructor-content__layout {
        border: 1px solid #fff;
        overflow: auto;
        max-width: v-bind(maxWidth);
        max-height: v-bind(maxHeight);
        min-height: v-bind(minHeight);
        background-color: v-bind(bgColor);
    }
</style>
