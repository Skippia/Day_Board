<script setup lang="ts">
    interface IPropsTab {
        tabData: { tabName: string; componentName: string }[]
        activeToggleClasses: string[]
        passiveToggleClasses: string[]
    }

    const props = defineProps<IPropsTab>()

    const overflowControl = ref<HTMLElement>()
    //* It's time animation for fade transition
    useDelayRenderFix(overflowControl, 600)

    const { getTabNames, getCurrentTabName, getRootRef, getCurrentClasses, getToggleElement } = useVTabs(props)
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
    .tab {
        @apply w-full h-full z-2 self-start;
    }
    .tab__toggle {
        @apply w-full py-2 text-center text-white text-2xl;
    }
    .tab__content {
        @apply flex flex-col justify-center max-h-[65vh] h-full w-full;
    }
</style>
