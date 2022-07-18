const useSelect = () => {
    const isOpen = ref(false)

    const toggleSelect = () => {
        isOpen.value = !isOpen.value
    }
    const closeSelect = () => {
        isOpen.value = false
    }
    const openSelect = () => {
        isOpen.value = true
    }
    const onMouseLeave = () => {
        isOpen.value = false
    }

    const methodsSelect = {
        toggleSelect,
        closeSelect,
        openSelect,
        onMouseLeave,
    }

    return { isOpen, methodsSelect }
}

export { useSelect }
