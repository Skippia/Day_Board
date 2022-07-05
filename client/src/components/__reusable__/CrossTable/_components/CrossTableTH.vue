<script setup lang="ts">
import { type Ref, onMounted, ref } from 'vue'

interface Props {
  attributes?: Array<{
    name: string
    value: string
  }>
  rootClasses?: Array<string>
}
const props = defineProps<Props>()

const th: Ref<HTMLElement | null> = ref(null)

onMounted(() => {
  props.attributes?.forEach((attribute) => {
    th.value!.setAttribute(attribute.name, attribute.value)
  })
})
</script>

<template>
  <th ref="th" :class="rootClasses">
    <slot />
  </th>
</template>

<style lang="scss" scoped>
th {
  font-size: 14px;
  // border-bottom: 0.5px solid rgba(24, 116, 205, 0.4);
  // padding: 5px 0;
  // border-collapse: separate;
}
</style>
