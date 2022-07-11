<script setup lang='ts'>

</script>

<template>
  <div class="flex h-screen p-10 gap-1em">
    <chart-wrapper class="basis-2/3" />
    <aside-panel class="basis-1/3 flex flex-col">
      <template #date-picker>
        <date-picker class="h-a" />
      </template>
      <template #select-picker>
        <select-picker class="h-1/3 basis-1/3" />
      </template>
    </aside-panel>
  </div>
</template>

<style lang='scss' scoped>
</style>
