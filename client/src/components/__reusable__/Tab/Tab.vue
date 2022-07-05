<script lang="ts">
import { type PropType, computed, defineComponent, ref } from 'vue'
import LogIn from '../../LogIn/LogIn.vue'
import SignUp from '../../SignUp/SignUp.vue'
import TabRoot from './TabRoot.vue'
import { useTabs } from './hook/useTabs'

export default defineComponent({
  components: {
    TabRoot,
    LogIn,
    SignUp,
  },
  props: {
    tabData: { type: Object as PropType<{ tabName: string; componentName: string }[]>, required: true },
    activeToggleClasses: { type: Array as PropType<string[]>, required: true },
    passiveToggleClasses: { type: Array as PropType<string[]>, required: true },
  },
  setup(props) {
    const tabs = useTabs()

    const customRef = ref<InstanceType<typeof LogIn | typeof SignUp>>()
    const getCustomRef = (el: InstanceType<typeof LogIn | typeof SignUp>) => {
      customRef.value = el?.$el
    }
    const getTabNames = computed(() => props.tabData.map(tabChunkData => tabChunkData.tabName))

    const getDynamicClasses = (idx: number) =>
      (tabs.isSelected(idx) && props.activeToggleClasses) || (!tabs.isSelected(idx) && props.passiveToggleClasses)

    const currentComponentName = computed(() => props.tabData[tabs.selected.value])

    return { getTabNames, tabs, getDynamicClasses, getCustomRef, currentComponentName }
  },
})
</script>

<template>
  <TabRoot :ref="tabs.getRootRef" class="z-10 min-h-full h-full">
    <template #tabTogglers>
      <div
        v-for="(tabName, idx) in getTabNames" :key="tabName" :ref="tabs.getToggleElement(idx)"
        :class="getDynamicClasses(idx)" class="w-full py-2 text-center text-white text-2xl"
      >
        {{ tabName }}
      </div>
    </template>
    <template #content>
      <keep-alive>
        <Transition name="fade" mode="out-in">
          <component :is="tabData[tabs.selected.value].componentName" :ref="getCustomRef" />
        </Transition>
      </keep-alive>
    </template>
  </TabRoot>
</template>

<style lang="scss" scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.fade-enter-active {
  transition: all 0.4s ease;
}

.fade-leave-active {
  transition: all 0.4s ease;
}
</style>
