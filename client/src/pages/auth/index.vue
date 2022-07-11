<script setup lang="ts">
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
</script>

<template>
  <AuthLayout>
    <VTab
      :tab-data="tabData" :active-toggle-classes="['tab-toggle-active']"
      :passive-toggle-classes="['hover:bg-[rgba(22,22,22,.3)] cursor-pointer duration-300 hover:scale-90']"
    />
  </AuthLayout>
</template>

<style lang="scss" scoped>
</style>
