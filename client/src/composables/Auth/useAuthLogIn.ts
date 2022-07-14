import type { Router } from 'vue-router'
import * as Yup from 'yup'

const storeAuth = useStoreAuth()

const useAuthLogIn = (router: Router) => {
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
          router.push('/panel')
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
  return { inputFormData, onSubmit, onInvalidSubmit, schema }
}

export { useAuthLogIn }
