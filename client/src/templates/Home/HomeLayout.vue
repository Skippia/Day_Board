<script setup lang="ts">
    const props = defineProps<{
        xTable: {
            width: string
        }
        statsPanel: {
            width: string
        }
    }>()

    const xTableWidth = ref(props.xTable.width)
    const statsPanelWidth = ref(props.statsPanel.width)
</script>

<template>
    <div class="home__container black-gradient">
        <div class="home-xtable__container">
            <slot name="xtable" />
        </div>

        <div class="stats-panel__container">
            <slot name="stats-panel" />
        </div>
        <slot name="modal"></slot>
    </div>
</template>

<style lang="scss" scoped>
    .home__container {
        @apply flex min-w-full min-h-screen max-h-screen p-2 bg-no-repeat;
    }
    .black-gradient {
        background-image: linear-gradient(to right bottom, #000000, #090808, #10100f, #161515, #1a1a19);
    }
    .home-xtable__container {
        width: v-bind(xTableWidth);
        overflow: auto;
    }
    .stats-panel__container {
        width: v-bind(statsPanelWidth);
        overflow: auto;
    }
</style>
