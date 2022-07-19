<script setup lang="ts">
    const { isOpen, openModal, closeModal } = useVModal(true)
</script>

<template>
    <v-modal :is-open="isOpen" :open-modal="openModal" :close-modal="closeModal">
        <template #header>
            <div class="flex flex-col items-center">
                <p class="text-white/50 text-4xl font-bold my-4">Welcome to new template!</p>
                <p class="text-white/70 text-2xl font-medium">Looks like you don’t have an active template...</p>
                <p class="text-white/90 text-2xl border-t-2 border-b-2 border-neutral-500 font-medium">
                    ...it’s time to create one!
                </p>
                <span class="i-carbon:calendar-heat-map opacity-50 my-3 text-6xl"></span>
            </div>
        </template>
        <template #close>
            <div class="i-carbon:close close-btn" />
        </template>
        <template #content>
            <div class="flex flex-col items-center w-full">
                <v-cross-button @click="$router.push('/constructor')"> Create new template </v-cross-button>
            </div>
        </template>
    </v-modal>
</template>

<style lang="scss" scoped>
    .close-btn {
        @apply text-white/60 text-5xl duration-300 hover:rotate-[90deg] hover:scale-120 hover:cursor-pointer hover:text-white;
    }
</style>
