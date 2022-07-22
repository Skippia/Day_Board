<script setup lang="ts">
    interface Props {
        mainColor?: string
        colorHover?: string
        bgColorHover?: string
    }
    const props = withDefaults(defineProps<Props>(), {
        mainColor: '#71dfbe',
        colorHover: '#000',
        bgColorHover: 'rgba(222, 222, 222, 0.5)',
    })
</script>

<template>
    <button class="button-create">
        <slot />
    </button>
</template>

<style lang="scss" scoped>
    $mainColor: v-bind(mainColor);
    $colorHover: v-bind(colorHover);
    $bgColorHover: v-bind(bgColorHover);

    .button-create {
        position: relative;
        padding: 1em 2em;
        border: none;
        background-color: transparent;
        cursor: pointer;
        outline: none;
        font-size: 25px;
        margin: 1em 0.8em;
        color: $mainColor;
        transition: all 0.6s ease-out;
        font-weight: 500;
        &:hover {
            color: $colorHover;
        }
        &::after,
        &::before {
            content: '';
            display: block;
            position: absolute;
            width: 20%;
            height: 20%;
            border: 2px solid;
            transition: all 0.6s ease;
            border-radius: 2px;
        }
        &::after {
            bottom: 0;
            right: 0;
            border-top-color: transparent;
            border-left-color: transparent;
            border-bottom-color: $mainColor;
            border-right-color: $mainColor;
        }
        &::before {
            top: 0;
            left: 0;
            border-bottom-color: transparent;
            border-right-color: transparent;
            border-top-color: $mainColor;
            border-left-color: $mainColor;
        }
        &:hover:after,
        &:hover:before {
            width: 100%;
            height: 100%;
            z-index: -20;
            background-color: $bgColorHover;
        }
    }
</style>
