import type { VNodeRef } from '@vue/runtime-dom'
import type TabRoot from '~/components/__reusable__/Tab/TabRoot.vue'

const useTabs = () => {
  //* Select part
  const selected = ref(0)
  const select = (index: number) => {
    selected.value = index
  }
  const isSelected = (index: number) => {
    return index === selected.value
  }

  //* Initialization elements
  const rootRef = ref<InstanceType<typeof TabRoot> | null>()
  const toggleElements = ref<HTMLElement[]>([])
  const getRootRef = (el: InstanceType<typeof TabRoot>) => {
    rootRef.value = el?.$el
    return rootRef as VNodeRef
  }

  const getToggleElement = (idx: number) => (el: HTMLElement) => {
    toggleElements.value[idx] = el
    return shallowRef(el)
  }

  //* Setting up listeners
  onMounted(() => {
    toggleElements.value.forEach((el: HTMLElement, idx: number) => {
      el?.addEventListener('click', () => select(idx))
    })
  })

  return { getRootRef, isSelected, getToggleElement, selected }
}

export { useTabs }
