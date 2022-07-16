<script setup lang="ts">
    import { Form } from 'vee-validate'
    const router = useRouter()

    const { inputFormData, onSubmit, onInvalidSubmit, schema } = useAuthLogIn(router)
</script>

<template>
    <div class="auth">
        <h1 class="auth__header">Log In</h1>
        <Form
            name="login"
            class="auth__form"
            :validation-schema="schema"
            @submit="onSubmit"
            @invalid-submit="onInvalidSubmit"
        >
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

            <button class="submit-btn" type="submit">Login</button>
        </Form>
    </div>
</template>

<style lang="scss" scoped>
    .submit-btn:focus {
        outline: 2px solid rgba(255, 255, 255, 0.8) !important;
    }
</style>
