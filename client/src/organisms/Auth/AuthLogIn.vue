<script setup lang="ts">
    import { Form } from 'vee-validate'
    const router = useRouter()

    const { inputFormData, onSubmit, onInvalidSubmit, schema } = useAuthLogIn(router)
</script>

<template>
    <div class="auth-content__container">
        <v-sub-title>Log In</v-sub-title>
        <Form
            name="login"
            class="auth__form"
            :validation-schema="schema"
            @submit="onSubmit"
            @invalid-submit="onInvalidSubmit"
        >
            <v-validate-form-input
                v-for="input in inputFormData"
                :key="input.placeholder"
                :placeholder="input.placeholder"
                :type="input.type"
                :name="input.name"
                :label="input.label"
                class="w-full"
                success-message="Nice and secure!"
            />

            <v-button my-3 color="#76c893" type="submit">LogIn</v-button>
        </Form>
    </div>
</template>

<style lang="scss" scoped>
    .auth-content__container {
        @apply flex flex-col items-center;
    }
    .auth {
        @apply h-full w-full flex flex-col justify-center;
    }
</style>
