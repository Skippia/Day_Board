<script setup lang="ts">
import { Form } from 'vee-validate'
import * as Yup from 'yup'

const inputFormData = [
  {
    'placeholder': 'Enter your email',
    'type': 'text',
    'label': 'Email',
    'name': 'email',
    'success-message': 'Right email!',
  },
  {
    'placeholder': 'Enter your name',
    'type': 'text',
    'label': 'Name',
    'name': 'name',
    'success-message': 'Wonderful name!',
  },
  {
    'placeholder': 'Enter your password',
    'type': 'password',
    'label': 'Password',
    'name': 'password',
    'success-message': 'Nice secure!',
  },
  {
    'placeholder': 'Confirm your password',
    'type': 'password',
    'label': 'Confirm password',
    'name': 'confirm_password',
    'success-message': 'Nice secure!',
  },
]

function onSubmit(values: object) {
  // console.log(values)
}

function onInvalidSubmit() {
  const submitBtn = document.querySelector('.submit-btn')
  submitBtn?.classList.add('invalid')
  setTimeout(() => {
    submitBtn?.classList.remove('invalid')
  }, 1000)
}

//* Schema validation
const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  name: Yup.string().required(),
  password: Yup.string().min(6).required(),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
})
</script>

<template>
  <div class="auth">
    <h1 class="auth__header">
      Sign Up
    </h1>
    <Form
      class="auth__form" :validation-schema="schema" @submit="onSubmit"
      @invalid-submit="onInvalidSubmit"
    >
      <CustomInput
        v-for="input in inputFormData" :key="input.placeholder" :placeholder="input.placeholder"
        :type="input.type" :name="input.name" :label="input.label" class="w-full" success-message="Nice and secure!"
      />

      <button
        class="submit-btn"
        type="submit"
      >
        SignUp
      </button>
    </Form>
  </div>
</template>

<style lang="scss" scoped>

</style>
