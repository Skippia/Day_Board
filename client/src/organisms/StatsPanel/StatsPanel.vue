<script setup lang="ts">
    const StoreUser = useStoreUser()
    const tasks = StoreUser.geITasks
    const dayData = StoreUser.getDayData

    const getCurrenITaskAmount = computed(() => dayData.length)
</script>

<template>
    <div class="stats-panel__container">
        <v-button-menu @click="StoreUser.clearLocalStorage" class="clear-btn">Clear</v-button-menu>
        <stats-panel-showcase> {{ getCurrenITaskAmount }}/ {{ tasks.length }} </stats-panel-showcase>
        <v-button-menu class="calc-btn" @click="$router.push('/stats-day')">Panel</v-button-menu>
        <v-button-menu class="calc-btn" @click="$router.push('/auth')">Auth</v-button-menu>
    </div>
</template>

<style lang="scss" scoped>
    .stats-panel__container {
        @apply flex flex-col w-full h-full justify-between items-center perspect-[1200px] py-3;
        background-color: rgba(22, 22, 22, 0.9);
    }

    .clear-btn,
    .calc-btn {
        @apply w-4/5 h-[20vh] duration-300 transition-all hover:cursor-pointer hover:scale-110;
    }
</style>
