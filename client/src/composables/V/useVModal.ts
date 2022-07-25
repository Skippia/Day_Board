const useVModal = (initState = false) => {
    const isOpen = ref(initState)

    const openModal = () => {
        isOpen.value = true
    }
    const closeModal = () => {
        isOpen.value = false
    }
    return { isOpen, openModal, closeModal }
}

export { useVModal }
