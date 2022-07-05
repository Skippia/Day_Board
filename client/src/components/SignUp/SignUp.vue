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
  <div class="content h-[80vh] overflow-auto w-full flex flex-col justify-center">
    <h1 class="text-white text-center my-5 font-bold text-3xl">
      Sign Up
    </h1>
    <Form
      class="flex flex-col w-4/5 mx-auto items-center h-full justify-around" :validation-schema="schema"
      @submit="onSubmit" @invalid-submit="onInvalidSubmit"
    >
      <CustomInput
        v-for="input in inputFormData" :key="input.placeholder" :placeholder="input.placeholder"
        :type="input.type" :name="input.name" :label="input.label" value="" class="w-full"
        success-message="Nice and secure!"
      />

      <button
        class="submit-btn text-black my-4 bg-white opacity-[30%] hover:opacity-[80%] duration-300 font-medium py-3 rounded text-2xl px-16"
        type="submit"
      >
        SignUp
      </button>
    </Form>
  </div>
</template>

<style lang="scss" scoped>
.submit-btn:focus {
  outline: 2px solid rgba(255, 255, 255, 0.8) !important;
}
</style>
