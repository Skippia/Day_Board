<script lang="ts" setup>
    const storeConstructor = useStoreConstructor()

    const list = computed(() => storeConstructor.getCurrentListTasks)

    const updateList = (updateList: { id: string; name: string }[]) => {
        storeConstructor.$state.currentListTasks = updateList
    }
</script>

<template>
    <div class="constructor-content__container">
        <v-title icon-class="i-carbon:calendar-heat-map" text="Hello to creating template calendar"></v-title>

        <div class="configurator__container">
            <constructor-tasks-module></constructor-tasks-module>
            <constructor-time-module></constructor-time-module>
        </div>
        <div class="draggable__container-wrapper">
            <div class="draggable__container">
                <v-error-notification
                    v-if="Object.keys(list).length === 0"
                    class="mb-5"
                    horizontal
                    icon-font-size="140px"
                    text-font-size="35px"
                    icon-class="i-carbon-face-dissatisfied"
                    icon-color="#ff9f1c"
                    text-color="#ffbf69"
                >
                    <template #sub-text>
                        <p>
                            You don't have any tasks yet.
                            <br />
                            Please, add tasks to your list.
                        </p>
                    </template>
                </v-error-notification>
                <v-draggable class="flex flex-wrap w-full gap-3" @update-list="updateList" :list="list"></v-draggable>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .constructor-content__container {
        @apply flex flex-col h-full w-full gap-5 p-8 items-center rounded-2xl overflow-auto;
    }
    .configurator__container {
        @apply flex flex-wrap justify-center border-2 gap-5 border-light-100 border-dashed rounded-lg p-5;
    }
    .draggable__container-wrapper {
        @apply h-full flex items-center justify-center;
    }
    .draggable__container {
        @apply flex w-full justify-center flex-wrap p-5;
    }
</style>
