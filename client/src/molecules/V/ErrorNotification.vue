<script setup lang='ts'>
const props = defineProps<{
  isRender: boolean
  textError: string

}>()
</script>

<template>
  <div v-if="!isRender" class="error-notification">
    <div class="warn i-carbon:warning" />
    <p
      class="error-notification__text c-shadow"
    >
      {{ textError }}
      <slot name="sub-text" />
    </p>
  </div>
</template>

<style lang='scss' scoped>
.error-notification {
  position: absolute;
  display: flex;
  row-gap: 20px;
  flex-direction: column;
  align-items: center;
}
.error-notification__text {
  @apply p-8 text-5xl text-red-500/70 border-2 border-red-600 rounded-xl bg-red-400/10;
}
.c-shadow {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
.warn {
  font-size: 250px;
  color: rgba(222, 136, 136, 0.5);
}
</style>
