<script setup lang="ts">
    import { Form } from 'vee-validate'

    /* const router = useRouter() */

    const { inputFormData, onSubmit, onInvalidSubmit, schema } = useAuthSignUp(/* router */)
</script>

<template>
    <div class="auth-content__container">
        <v-sub-title>Sign Up</v-sub-title>
        <Form class="auth__form" :validation-schema="schema" @submit="onSubmit" @invalid-submit="onInvalidSubmit">
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
            <v-button my-3 color="#00b4d8" type="submit">SignUp</v-button>
        </Form>
    </div>
</template>

<style lang="scss" scoped>
    .auth-content__container {
        @apply flex flex-col items-center;
    }
</style>
