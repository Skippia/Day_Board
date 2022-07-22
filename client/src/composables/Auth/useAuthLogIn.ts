import type { Router } from 'vue-router'
import * as Yup from 'yup'
import { Tooltip } from '~/logic/Tooltip'
import { IResponseError } from '~/types/types'

const storeAuth = useStoreAuth()

const useAuthLogIn = (router: Router) => {
    const inputFormData = [
        {
            placeholder: 'Enter your email',
            type: 'text',
            label: 'Email',
            name: 'email',
            'success-message': 'Right email!',
        },
        {
            placeholder: 'Enter your password',
            type: 'password',
            label: 'Password',
            name: 'password',
            'success-message': 'Nice secure!',
        },
    ]
    function onSubmit(values: object) {
        storeAuth
            // @ts-expect-error really is
            .login({ email: values?.email, password: values?.password })
            .then(({ error, successMessage }: { error?: IResponseError; successMessage?: string }) => {
                Tooltip.run({
                    error: !!error,
                    messageSuccess: successMessage,
                    messageFail: error?.message,
                })

                if (!error) {
                    setTimeout(() => {
                        router.push('/stats-day')
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
