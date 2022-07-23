<script lang="ts" setup>
    import { VueDraggableNext as draggable } from 'vue-draggable-next'
    const storeConstructor = useStoreConstructor()
    const props = defineProps<{ list: { id: string; name: string }[] }>()
    const emits = defineEmits<{ (e: 'update-list', updateList: { id: string; name: string }[]): void }>()
    const list = ref(props.list)

    const updateList = () => {
        emits('update-list', list.value)
    }
    const attachName = (elName: string) => {
        storeConstructor.updateCurrentListTasks({ value: elName, add: false })
    }
</script>
<template>
    <draggable v-model="list" @change="updateList">
        <v-badge v-for="element in list" :key="element.name">
            {{ element.name }}
            <v-icon icon-class="i-carbon-close-outline" @click="attachName(element.name)"> </v-icon>
        </v-badge>
    </draggable>
</template>
