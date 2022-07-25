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
        console.log('mopunted')

        const els = searcher()
        paintElements(els)
    })
    return { generateColor }
}

export { useVPaintEl }
