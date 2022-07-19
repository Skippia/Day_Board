<script setup lang="ts">
    interface Props {
        textError: string
        iconClass?: string
        textFontSize?: string
        iconFontSize?: string
        iconColor?: string
        textColor?: string
        bgColor?: string
    }

    const props = withDefaults(defineProps<Props>(), {
        iconClass: 'i-carbon:warning',
        textFontSize: '48px',
        iconFontSize: '250px',
        iconColor: 'rgba(222, 136, 136, 0.5)',
        textColor: 'rgba(239,68,68,70)',
        bgColor: 'transparent',
    })
</script>

<template>
    <div class="error-notification">
        <div v-if="iconClass" :class="iconClass" class="icon" />
        <p class="error-notification__text c-shadow">
            {{ textError }}
            <slot name="sub-text" />
        </p>
    </div>
</template>

<style lang="scss" scoped>
    .icon {
        font-size: v-bind(iconFontSize);
        color: v-bind(iconColor);
    }
    .error-notification {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .error-notification__text {
        font-size: v-bind(textFontSize);
        border-color: v-bind(textColor);
        color: v-bind(textColor);
        background-color: v-bind(bgColor);
        @apply p-8 border-2 rounded-xl;
    }
    .c-shadow {
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    }
</style>
