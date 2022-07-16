<script setup lang="ts"></script>

<template>
    <router-view v-slot="{ Component }">
        <transition name="route" mode="out-in">
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<style lang="scss">
    @import '~/assets/styles/transitionAnimation.scss';

    #app {
        overflow-x: hidden;
        background-color: rgba(10, 9, 7, 1);
    }
</style>
