<script setup lang="ts">
    const props = defineProps<{
        options: { name: string; value: string }[]
        isOpen: boolean
        methods: {
            toggleSelect: () => void
            closeSelect: () => void
            openSelect: () => void
            onMouseLeave: () => void
        }
        modelValue: string
        selectClasses?: string
        optionClasses?: string
    }>()

    const emit = defineEmits<{
        (e: 'update:modelValue', value: string): void
    }>()

    function updateTitleValue(value: string) {
        emit('update:modelValue', value)
        props.methods.closeSelect()
    }
</script>

<template>
    <div class="flex flex-col relative z-30">
        <p :class="selectClasses" class="h-[50px] min-w-[150px]" @click="props.methods.toggleSelect">
            {{ modelValue }}
        </p>
        <ul v-if="isOpen" @mouseleave="props.methods.onMouseLeave" class="absolute top-[50px] left-0 right-0">
            <li
                :class="optionClasses"
                v-for="option of options"
                :key="option.name"
                :value="option.value"
                @click="updateTitleValue(option.name)"
            >
                {{ option.name }}
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped></style>
