<script lang="ts" setup>
    import { VueDraggableNext as draggable } from 'vue-draggable-next'

    const props = defineProps<{
        arrayDraggable: { name: string; id: number }[]
    }>()

    const myList = ref(props.arrayDraggable)
</script>
<template>
    <draggable v-model="myList" class="flex flex-wrap gap-5">
        <slot></slot>
    </draggable>
</template>
<style lang="scss" scoped></style>
