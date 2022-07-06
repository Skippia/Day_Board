import type { VNodeRef } from '@vue/runtime-dom'
import type TabRoot from '~/organisms/TabRoot.vue'

const useTabs = (props: any) => {
  //* Select part
  const selected = ref(0)
  const select = (index: number) => {
    selected.value = index
  }
  const isSelected = (index: number) => index === selected.value

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

  const getTabNames = computed(() => props.tabData.map((tabChunkData: { tabName: string }) => tabChunkData.tabName))

  const getCurrentTabName = computed(() => props.tabData[selected.value].componentName)

  const getCurrentClasses = (idx: number) =>
    (isSelected(idx) && props.activeToggleClasses) || (!isSelected(idx) && props.passiveToggleClasses)

  return { getRootRef, getTabNames, getCurrentTabName, getCurrentClasses, isSelected, getToggleElement, selected }
}

export { useTabs }
