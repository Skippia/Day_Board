<script setup lang='ts'>
const testReactive = reactive({
  name: 'Mr',
  lastName: 'Andersson',
})

const switchColor = (e: Event) => {
}

watch(testReactive, (val) => {
  console.log(val)
})
</script>

<template>
  <div bg-emerald-200 flex flex-col items-center justify-around>
    <button role="switch-color" p-2 bg-pink-300 rounded-lg my-3 @click="switchColor">
      Increase
    </button>
  </div>
</template>

<style lang='scss' scoped>
.lol {
  background: black;
}
</style>
