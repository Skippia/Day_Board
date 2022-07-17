<script setup lang="ts"></script>

<template>
    <constructor-overlay height="95%">
        <div class="constructor">
            <h1 class="constructor__template-title">
                Hello to creating template calendar
                <span class="i-carbon:calendar-heat-map text-4xl"></span>
            </h1>
            <div class="top-wrapper">
                <constructor-time-module></constructor-time-module>
                <button class="button-create-template self-center">Save template</button>
            </div>
            <div class="bottom-wrapper">
                <constructor-tasks-module></constructor-tasks-module>
            </div>
        </div>
    </constructor-overlay>
</template>

<style lang="scss" scoped>
    .constructor {
        @apply p-10 flex flex-col h-full justify-between;
    }
    .constructor__template-title {
        @apply text-4xl flex items-center gap-3;
    }
    .top-wrapper {
        @apply flex justify-around border-2 border-light-100 border-dashed rounded-lg p-5;
    }
    .bottom-wrapper {
    }
    .button-create-template {
        background: #2b2d2f;
        text-align: center;
        cursor: pointer;
        padding: 20px 40px;
        border-radius: 4px;
        font-weight: bold;
        font-size: 35px;
        color: #71dfbe;
    }
</style>
