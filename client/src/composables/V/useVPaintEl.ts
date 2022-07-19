const useVPaintEl = ({
    searcher,
    generateColor,
}: {
    searcher: () => Array<HTMLElement>
    generateColor: () => string
}) => {
    const paintElements = (els: Array<HTMLElement>) => {
        els.forEach((el) => (el.style.backgroundColor = generateColor()))
    }

    onMounted(() => {
        const els = searcher()
        paintElements(els)
    })
    return { generateColor }
}

export { useVPaintEl }
