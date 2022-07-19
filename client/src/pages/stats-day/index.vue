<script setup lang="ts"></script>

<template>
    <stats-day-layout :stats-day-chart="{ width: '66%' }" :stats-day-aside-panel="{ width: '33%' }">
        <template #stats-day-chart>
            <stats-day-chart></stats-day-chart>
        </template>

        <template #stats-day-aside-panel>
            <stats-day-date-picker></stats-day-date-picker>
        </template>
    </stats-day-layout>
</template>

<style lang="scss" scoped></style>
