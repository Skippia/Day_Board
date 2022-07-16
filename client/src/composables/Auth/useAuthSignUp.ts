import * as Yup from 'yup'

const useAuthSignUp = (/* router: Router */) => {
    const inputFormData = [
        {
            placeholder: 'Enter your email',
            type: 'text',
            label: 'Email',
            name: 'email',
            'success-message': 'Right email!',
        },
        {
            placeholder: 'Enter your name',
            type: 'text',
            label: 'Name',
            name: 'name',
            'success-message': 'Wonderful name!',
        },
        {
            placeholder: 'Enter your password',
            type: 'password',
            label: 'Password',
            name: 'password',
            'success-message': 'Nice secure!',
        },
        {
            placeholder: 'Confirm your password',
            type: 'password',
            label: 'Confirm password',
            name: 'confirm_password',
            'success-message': 'Nice secure!',
        },
    ]

    function onSubmit(values: object) {
        /// *------------- Temporarily -------------
        return values
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
    return { inputFormData, onSubmit, onInvalidSubmit, schema }
}

export { useAuthSignUp }
