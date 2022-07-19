<script setup lang="ts">
    const props = defineProps<{
        maxWidth: string
        maxHeight: string
        bgColor: string
    }>()
</script>

<template>
    <div class="constructor__container">
        <div class="constructor-content__container rounded-2xl">
            <slot name="constructor-content" />
        </div>
        <slot name="button-save" />
    </div>
</template>

<style lang="scss" scoped>
    .constructor__container {
        @apply w-full h-screen flex flex-col gap-5 justify-center items-center;
    }
    .constructor-content__container {
        border: 1px solid #fff;
        overflow: auto;
        max-width: v-bind(maxWidth);
        max-height: v-bind(maxHeight);
        background-color: v-bind(bgColor);
    }
</style>
