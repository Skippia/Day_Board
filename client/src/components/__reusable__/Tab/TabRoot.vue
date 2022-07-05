<script setup lang="ts"></script>

<template>
  <div class="flex w-full flex-col justify-between">
    <div class="flex">
      <slot name="tabTogglers" />
    </div>
    <div class="w-full">
      <slot name="content" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
