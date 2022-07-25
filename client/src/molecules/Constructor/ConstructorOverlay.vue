<script setup lang="ts">
    const props = defineProps({
        maxWidth: {
            type: String,
            default: '90%',
        },
        maxHeight: {
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
        <div class="constructor-overlay__content rounded-2xl">
            <slot></slot>
        </div>
        <!-- <button class="button-create-template mt-5">Save template</button> -->
    </div>
</template>

<style lang="scss" scoped>
    .constructor-overlay {
        @apply w-full h-screen flex flex-col items-center justify-center;
    }

    .constructor-overlay__content {
        border: 1px solid #fff;
        width: fit-content;
        overflow: auto;
        max-width: v-bind(maxWidth);
        max-height: v-bind(maxHeight);
        background-color: v-bind(bgColor);
    }
    .button-create-template {
        background: #2b2d2f;
        text-align: center;
        cursor: pointer;
        padding: 20px 40px;
        border-radius: 4px;
        font-weight: bold;
        font-size: 35px;
        color: #71dfbe;
    }
</style>
