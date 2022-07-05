<script setup lang="ts">
</script>

<template>
  <div class="root-wrapper w-full mx-a h-screen flex relative justify-center items-center">
    <div class="auth-wrapper w-[30%] auth-wrapper-shadow rounded-3xl absolute flex justify-center items-center">
      <img
        src="../assets/img/LoginBg.jpg"
        class="min-h-screen h-full filter-upset absolute translate-y-[-20px] min-w-[222%]" alt=""
      >
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth-wrapper-shadow {
  box-shadow: 6px 3px 6px 0px rgba(0, 0, 0, 1);
  overflow: hidden;
}

.root-wrapper {
  background: center/cover url('../assets/img/LoginBg.jpg');
}

.filter-upset {
  filter: grayscale(100%) brightness(0.6);
}
</style>
