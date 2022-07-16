<script setup lang="ts">
    import { Form } from 'vee-validate'

    /* const router = useRouter() */

    const { inputFormData, onSubmit, onInvalidSubmit, schema } = useAuthSignUp(/* router */)
</script>

<template>
    <div class="auth">
        <h1 class="auth__header">Sign Up</h1>
        <Form class="auth__form" :validation-schema="schema" @submit="onSubmit" @invalid-submit="onInvalidSubmit">
            <ValidateInput
                v-for="input in inputFormData"
                :key="input.placeholder"
                :placeholder="input.placeholder"
                :type="input.type"
                :name="input.name"
                :label="input.label"
                class="w-full"
                success-message="Nice and secure!"
            />

            <button class="submit-btn" type="submit">SignUp</button>
        </Form>
    </div>
</template>

<style lang="scss" scoped></style>
