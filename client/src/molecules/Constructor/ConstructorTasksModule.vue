<script setup lang="ts">
    const taskValue = ref('')
</script>

<template>
    <div class="c-tasks-module__container">
        <v-sub-title underline>Task constructor</v-sub-title>
        <div class="c-tasks-module__add-task">
            <v-sub-title font-size="20px" opacity-70>Add task</v-sub-title>
            <div class="c-tasks-module__add-task-input">
                <v-input
                    type="text"
                    name="new-task"
                    placeholder="Task name..."
                    :classes="'bg-neutral-500/20 border-slate-200'"
                    v-model="taskValue"
                />
                <v-icon font-size="50px" icon-class="i-carbon-add-alt"></v-icon>
            </div>
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
</style>
