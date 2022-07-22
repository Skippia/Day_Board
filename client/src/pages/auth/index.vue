<script lang="ts">
    import AuthSignUp from '~/organisms/Auth/AuthSignUp.vue'
    import AuthLogIn from '~/organisms/Auth/AuthLogIn.vue'

    export default defineComponent({
        components: {
            AuthSignUp,
            AuthLogIn,
        },
        setup() {
            const tabData = [
                {
                    tabName: 'Log In',
                    componentName: 'AuthLogIn',
                },
                {
                    tabName: 'Sign Up',
                    componentName: 'AuthSignUp',
                },
            ]
            return { tabData }
        },
    })
</script>

<template>
    <auth-layout>
        <v-tab
            :tab-data="tabData"
            :active-toggle-classes="['tab-toggle-active']"
            :passive-toggle-classes="['tab-toggle-passive']"
        >
            <template #dynamic-component="{ getCurrentTabName }">
                <Transition name="fade" mode="out-in">
                    <keep-alive>
                        <component :is="getCurrentTabName" />
                    </keep-alive>
                </Transition>
            </template>
        </v-tab>
    </auth-layout>
</template>

<style lang="scss" scoped></style>
