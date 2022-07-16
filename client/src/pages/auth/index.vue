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
    <AuthLayout>
        <VTab
            :tab-data="tabData"
            :active-toggle-classes="['tab-toggle-active']"
            :passive-toggle-classes="['hover:bg-[rgba(22,22,22,.3)] cursor-pointer duration-300 hover:scale-90']"
        >
            <template #dynamic-component="{ getCurrentTabName }">
                <Transition name="fade" mode="out-in">
                    <keep-alive>
                        <component :is="getCurrentTabName" />
                    </keep-alive>
                </Transition>
            </template>
        </VTab>
    </AuthLayout>
</template>

<style lang="scss" scoped>
    @import '~/assets/styles/transitionAnimation.scss';
</style>
