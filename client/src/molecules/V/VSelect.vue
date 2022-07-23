<script setup lang="ts">
    interface Props {
        options: { name: string; value: string | null }[]
        isOpen: boolean
        methods: {
            toggleSelect: () => void
            closeSelect: () => void
            openSelect: () => void
            onMouseLeave: () => void
        }
        modelValue: { name: string; value: string | null }
        selectColor?: string
        selectBgColor?: string
        selectFontSize?: string
        selectPadding?: string

        optionColor?: string
        optionBgColor?: string
        optionFontSize?: string
        optionPadding?: string
        optionMargin?: string
    }

    const props = withDefaults(defineProps<Props>(), {
        selectColor: 'rgba(222,222,222,1)',
        selectBgColor: 'rgba(72,100,255,0.8)',
        selectFontSize: '20px',
        selectPadding: '0px',

        optionColor: 'rgba(0,0,0,1)',
        optionBgColor: 'rgba(222, 226, 230,1)',
        optionFontSize: '19px',
        optionPadding: '8px',
        optionMargin: '2px 0',
    })

    const selectColor = computed(() => props.selectColor)
    const selectBgColor = computed(() => props.selectBgColor)
    const selectFontSize = computed(() => props.selectFontSize)
    const selectPadding = computed(() => props.selectPadding)

    const optionColor = computed(() => props.optionColor)
    const optionBgColor = computed(() => props.optionBgColor)
    const optionFontSize = computed(() => props.optionFontSize)
    const optionPadding = computed(() => props.optionPadding)
    const optionMargin = computed(() => props.optionMargin)

    const emit = defineEmits<{
        (e: 'update:modelValue', info: { name: string; value: string }): void
    }>()

    function updateTitleValue({ name, value }: { name: string; value: string }) {
        emit('update:modelValue', { name, value })
        props.methods.closeSelect()
    }

    const selectName = computed(() => props.modelValue.name)
</script>

<template>
    <div class="flex flex-col relative z-30">
        <p class="select" @click="props.methods.toggleSelect">
            {{ selectName }}
        </p>
        <ul v-if="isOpen" @mouseleave="props.methods.onMouseLeave" class="absolute top-[50px] left-0 right-0">
            <li
                class="option"
                v-for="option of options"
                :key="option.name"
                :value="(option.value as string)"
                @click="updateTitleValue({ name: option.name, value: option.value as string })"
            >
                {{ option.name }}
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
    .select {
        background-color: v-bind(selectBgColor);
        color: v-bind(selectColor);
        font-size: v-bind(selectFontSize);
        padding: v-bind(selectPadding);
        @apply flex items-center justify-center h-[50px] min-w-[150px] text-center rounded-t-xl font-medium opacity-70
        hover:opacity-100 hover:cursor-pointer;
    }

    .option {
        background-color: v-bind(optionBgColor);
        color: v-bind(optionColor);
        font-size: v-bind(optionFontSize);
        padding: v-bind(optionPadding);
        margin: v-bind(optionMargin);
        @apply border-2 rounded-lg text-center hover:cursor-pointer;
        &:hover {
            color: v-bind(optionBgColor);
            background-color: v-bind(optionColor);
        }
    }
</style>
