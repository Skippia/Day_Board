import type { Ref } from 'vue'

const useDelayRenderFix = (contentWrapper: Ref<HTMLElement | undefined>) => {
  const currentTimeout = ref()

  onBeforeUpdate(() => {
    clearTimeout(currentTimeout.value)
    contentWrapper.value?.classList.remove('scroll-visible')
    contentWrapper.value?.classList.add('scroll-invisible')
  })

  onUpdated(() => {
    contentWrapper.value?.classList.remove('scroll-invisible')
    currentTimeout.value = setTimeout(() => {
      contentWrapper.value?.classList.add('scroll-visible')
    }, 600)
  })
}

export { useDelayRenderFix }
