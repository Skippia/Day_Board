<script setup lang="ts">
    import { apiUser } from '~/API/ApiUser'

    const storeConstructor = useStoreConstructor()
    const isDisabled = computed(
        () =>
            storeConstructor.getDefaultDayTemplate.listTasks.length === 0 ||
            storeConstructor.getDefaultDayTemplate.listTimes.length === 0
    )
    const updateDefaultDayTemplate = () => {
        const dTemplate = storeConstructor.getDefaultDayTemplate
        const { listTimes, listTasks } = dTemplate
        apiUser.createDefaultDayTemplate({ body: { listTimes, listTasks } })
    }
</script>

<template>
    <div>
        <constructor-layout max-width="70%" min-height="80% " max-height="90%" bg-color="rgba(22,22,22,0.6)">
            <template #constructor-content>
                <constructor-content></constructor-content>
            </template>

            <template #buttons>
                <v-button
                    @click="updateDefaultDayTemplate"
                    color="#71dfbe"
                    bg-color="rgba(22,22,22,0.9)"
                    font-size="35px"
                    :disabled="isDisabled"
                    >Save template</v-button
                >
            </template>
        </constructor-layout>
    </div>
</template>

<style lang="scss" scoped></style>
