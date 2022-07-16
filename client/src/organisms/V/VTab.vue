<script setup lang="ts">
    const props = defineProps({
        tabData: {
            type: Array<{ tabName: string; componentName: string }>,
            required: true,
        },
        activeToggleClasses: { type: Array<string>, required: true },
        passiveToggleClasses: { type: Array<string>, required: true },
    })

    const overflowControl = ref<HTMLElement>()
    //* It's time animation for fade transition
    useDelayRenderFix(overflowControl, 600)

    const { getTabNames, getCurrentTabName, getRootRef, getCurrentClasses, getToggleElement } = useTabs(props)
</script>

<template>
    <div :ref="getRootRef" class="tab">
        <div class="flex h-a">
            <div
                v-for="(tabName, idx) in getTabNames"
                :key="tabName"
                :ref="getToggleElement(idx)"
                :class="getCurrentClasses(idx)"
                class="tab__toggle"
            >
                {{ tabName }}
            </div>
        </div>
        <div class="tab__content">
            <div ref="overflowControl">
                <slot name="dynamic-component" :get-current-tab-name="getCurrentTabName" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '~/assets/styles/transitionAnimation.scss';
    .tab__content {
        @apply flex flex-col justify-center max-h-[65vh] h-full;
    }
    .tab {
        @apply w-full h-full z-2 self-start;
    }

    .tab__toggle {
        @apply w-full py-2 text-center text-white text-2xl;
    }
</style>
