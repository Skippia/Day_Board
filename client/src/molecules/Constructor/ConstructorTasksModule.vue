<script setup lang="ts">
    const storeConstructor = useStoreConstructor()
    const taskRef = ref('')

    const addTask = () => {
        storeConstructor.updateCurrentListTasks({ value: taskRef.value, add: true })
        taskRef.value = ''
    }

    const isDisabled = computed(() => {
        if (taskRef.value.length < 2) {
            return true
        }
        if (storeConstructor.getCurrentListTasks.find((el) => el.name === taskRef.value)) {
            return true
        }
    })
</script>

<template>
    <div class="c-tasks-module__container">
        <v-sub-title underline>Task constructor</v-sub-title>
        <div class="c-tasks-module__add-task">
            <v-sub-title font-size="20px" opacity-70>Add task</v-sub-title>
            <form @submit.prevent="addTask" class="c-tasks-module__add-task-input">
                <v-input
                    type="text"
                    name="new-task"
                    placeholder="Task name..."
                    :error-status="isDisabled"
                    :classes="'bg-neutral-500/20 border-slate-200'"
                    v-model="taskRef"
                />
                <button type="submit" :disabled="isDisabled">
                    <v-icon font-size="50px" icon-class="i-carbon-add-alt" :class="{ 'off-icon': isDisabled }"></v-icon>
                </button>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .c-tasks-module__container {
        @apply flex flex-col gap-4 border-2 p-5;
    }
    .c-tasks-module__add-task {
        @apply flex flex-col items-start;
    }
    .c-tasks-module__add-task-input {
        @apply flex items-center gap-2;
    }
    .off-icon {
        @apply opacity-5 hover:opacity-5 hover:scale-100;
    }
</style>
