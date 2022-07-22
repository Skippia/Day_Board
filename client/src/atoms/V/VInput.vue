<script setup lang="ts">
    import { Ref } from 'vue'

    const emit = defineEmits<{
        (e: 'update:modelValue', value: string | undefined): void
    }>()
    interface Props {
        type: 'text' | 'password' | 'number'
        name: string
        modelValue: string
        placeholder: string
        autofocus?: boolean
        classes?: string
        fontSize?: string
        borderStyle?: string
        borderColor?: string
    }

    const props = withDefaults(defineProps<Props>(), {
        autofocus: false,
        fontSize: '20px',
        borderStyle: 'solid',
        borderColor: '#71dfbe',
    })

    const myInput: Ref<null | HTMLElement> = ref(null)
    onMounted(() => {
        if (props.autofocus && myInput.value) {
            myInput.value.focus()
        }
    })

    const modelValue = computed({
        get: () => props.modelValue,
        set: (value) => emit('update:modelValue', value),
    })
</script>

<template>
    <input ref="myInput" v-model="modelValue" :class="classes" :placeholder="placeholder" />
</template>

<style lang="scss" scoped>
    input {
        outline: none;
        @apply text-white font-medium p-2 rounded shadow-md text-white;
        font-size: v-bind(fontSize);

        &:focus {
            outline: 2px v-bind(borderStyle) v-bind(borderColor);
        }
        &::placeholder {
            text-align: left;
            font-size: v-bind(fontSize);
        }
    }
</style>
