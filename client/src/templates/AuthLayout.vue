<script setup lang="ts">
</script>

<template>
  <div class="auth-layout auth-layout-bg">
    <div class="auth-layout__content">
      <img src="../assets/img/LoginBg.jpg" class="auth-layout__content-bg filter--upset" alt="">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth-layout {
  @apply w-full h-screen flex justify-center items-center;
}

.auth-layout-bg {
  background: center/cover url('../assets/img/LoginBg.jpg');
}

.auth-layout__content {
  @apply absolute max-h-[75vh] rounded-xl h-full max-w-[30%] w-full flex justify-center items-center overflow-hidden;
}

.auth-layout__content-bg {
  @apply h-full rounded-xl absolute translate-y-[-0px] min-w-[200%];
}

.filter--upset {
  filter: grayscale(100%) brightness(0.4);
}
</style>
