<script setup lang="ts">
import { Form } from 'vee-validate'
import * as Yup from 'yup'
import { useRouter } from 'vue-router'
const router = useRouter()
const storeAuth = useStoreAuth()
const inputFormData = [
  {
    'placeholder': 'Enter your email',
    'type': 'text',
    'label': 'Email',
    'name': 'email',
    'success-message': 'Right email!',
  },
  {
    'placeholder': 'Enter your password',
    'type': 'password',
    'label': 'Password',
    'name': 'password',
    'success-message': 'Nice secure!',
  },
]
function onSubmit(values: object) {
  // @ts-expect-error really is
  storeAuth.login({ email: values?.email, password: values?.password }).then((successLogin) => {
    if (successLogin) {
      setTimeout(() => {
        router.push('/')
      }, 1125)
    }
  })
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
  password: Yup.string().min(6).required(),
})
</script>

<template>
  <div class="auth">
    <h1 class="auth__header">
      Log In
    </h1>
    <Form
      name="login" class="auth__form" :validation-schema="schema" @submit="onSubmit"
      @invalid-submit="onInvalidSubmit"
    >
      <CustomInput
        v-for="input in inputFormData" :key="input.placeholder" :placeholder="input.placeholder"
        :type="input.type" :name="input.name" :label="input.label" class="w-full" success-message="Nice and secure!"
      />

      <button class="submit-btn" type="submit">
        Login
      </button>
    </Form>
  </div>
</template>

<style lang="scss" scoped>
.submit-btn:focus {
  outline: 2px solid rgba(255, 255, 255, 0.8) !important;
}
</style>
