<script setup lang="ts">
import { toRef } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  value: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  successMessage: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
})

const name = toRef(props, 'name')

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.value,
})
</script>

<template>
  <div class="flex flex-col my-2">
    <div class="TextInput" :class="{ 'has-error': !!errorMessage, 'success': meta.valid }">
      <label class="self-start text-gray-300 font-bold text-sm" :for="name">{{ label }}</label>
    </div>
    <input
      :id="name" :name="name" :type="type" :value="inputValue" :placeholder="placeholder"
      class="text-white rounded bg-[rgba(22,22,22,0.8)] p-3" @input="handleChange" @blur="handleBlur"
    >
    <p v-show="errorMessage || meta.valid" :class="meta.valid ? 'help-message' : 'error-message'">
      {{ errorMessage || successMessage }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
input {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>
