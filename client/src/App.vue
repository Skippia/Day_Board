<script setup lang="ts"></script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style lang="scss">
#app {
  overflow-x: hidden;
  background-color: rgba(10, 9, 7, 1);
}

.route-enter-from {}

.route-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translatY(0);
}

.route-enter-active {
  transition: all 0.5s ease;
}

.route-leave-active {
  transition: all 0.5s ease;
}
</style>
