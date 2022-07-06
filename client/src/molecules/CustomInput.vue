<script setup lang="ts">
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
    required: false,
  },
  successMessage: {
    type: String,
    required: false,
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
  <div class="flex flex-col my-1">
    <LabelInput v-if="label" :label="label" :name="name" />
    <input
      :id="name" :class="{ 'error-focus': !!errorMessage, 'right-focus': !errorMessage }" :name="name" :type="type"
      :value="inputValue" :placeholder="placeholder" class="custom-input custom-input--shadow" @input="handleChange"
      @blur="handleBlur"
    >
    <p v-show="(errorMessage || meta.valid) && successMessage" :class="meta.valid ? 'help-message' : 'error-message'">
      {{ errorMessage || successMessage }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.custom-input {
  @apply text-white rounded p-3;
  background-color: rgba(22, 22, 22, 0.8);
}

.custom-input--shadow {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.error-focus {
  &:focus {
    border: 3px solid rgba(133, 29, 29, 0.573);
  }
}

.right-focus {
  &:focus {
    border: 3px solid rgba(35, 183, 91, 0.573);
  }
}
</style>
