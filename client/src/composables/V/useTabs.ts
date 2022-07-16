import type { VNodeRef } from 'vue'

const useTabs = (props: any) => {
    //* Select part
    const selected = ref(0)
    const select = (index: number) => {
        selected.value = index
    }
    const isSelected = (index: number) => index === selected.value

    //* Initialization elements
    const rootRef = ref<HTMLElement>()
    const toggleElements = ref<HTMLElement[]>([])
    const getRootRef = (el: HTMLElement) => {
        rootRef.value = el
        // ! Added for TS compatibility, but not needed
        return rootRef as VNodeRef
    }

    const getToggleElement = (idx: number) => (el: HTMLElement) => {
        toggleElements.value[idx] = el
        // ! Added for TS compatibility, but not needed
        return shallowRef(el)
    }

    //* Setting up listeners on every tab
    onMounted(() => {
        toggleElements.value.forEach((el: HTMLElement, idx: number) => {
            el.addEventListener('click', () => select(idx))
        })
    })

    const getTabNames = computed(() => props.tabData.map((tabChunkData: { tabName: string }) => tabChunkData.tabName))

    const getCurrentTabName = computed(() => props.tabData[selected.value].componentName)

    const getCurrentClasses = (idx: number) =>
        (isSelected(idx) && props.activeToggleClasses) || (!isSelected(idx) && props.passiveToggleClasses)

    return {
        getRootRef,
        getTabNames,
        getCurrentTabName,
        getCurrentClasses,
        isSelected,
        getToggleElement,
        selected,
    }
}

export { useTabs }
