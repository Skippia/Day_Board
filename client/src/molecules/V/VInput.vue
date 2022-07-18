<script setup lang="ts">
    import { Ref } from 'vue'

    const emit = defineEmits<{
        (e: 'update:modelValue', value: string | undefined): void
    }>()
    const props = defineProps<{
        autofocus?: boolean
        placeholder?: string
        initValue?: string
        modelValue?: string
        classes?: string
    }>()

    let inputData = props.initValue || ''

    const myInput: Ref<null | HTMLElement> = ref(null)
    onMounted(() => {
        if (props.autofocus && myInput.value) {
            myInput.value.focus()
        }
    })
    const updateNewValue = (e: Event) => {
        const target = e.target as HTMLInputElement
        inputData = target.value
    }

    const modelValue = computed({
        get: () => props.modelValue,
        set: (value) => emit('update:modelValue', value),
    })
</script>

<template>
    <input ref="myInput" v-model="modelValue" :class="classes" :placeholder="placeholder" @input="updateNewValue" />
</template>

<style scoped>
    input {
        outline: none;
    }

    input:focus {
        outline: 2px dashed #ddb892;
    }

    input::placeholder {
        text-align: left;
    }
</style>
