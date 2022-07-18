<script setup lang="ts">
    import { useModal } from '~/logic/useModal'

    const StoreUser = useStoreUser()
    const searcherTds = () => [...document.querySelectorAll('td')].filter((el) => !el.classList.contains('time'))
    const searcherTable = () => document.querySelector('table')
    const isTableCell = UTIL.createSelector({ tagName: 'td' })

    const { yMapper, xMapper, times, tasks, currentList } = useInitCrossTableValues(StoreUser)

    const { generateColor } = useGenerateColor({ rangeTransparency: [0, 70], colorTransparency: [0, 30] })

    //* To paint table cells by selector
    usePaintTableCell({ searcher: searcherTds, generateColor })

    //* Get click listener
    const { clickActionOnTableCell } = useTableClickAction({
        isClickElement: isTableCell,
        generateColor,
        updateCurrentDay: StoreUser.updateCurrentDay,
        currentList,
    })

    //* Get hover listener
    const { hoverActionOnTableCell } = useTableHoverAction({ searcherTable, isHoverElement: isTableCell })

    onMounted(() => {
        //* Upload data
        StoreUser.restoreCurrentDay(currentList)
    })

    const { isOpen, openModal, closeModal } = useModal()
</script>

<template>
    <div class="home black-gradient">
        <VCrossTable
            ref="table"
            class="w-[85%]"
            :x-mapper="xMapper"
            :y-mapper="yMapper"
            :th-root-horizontal-classes="['rotate-transform', 'border-r-2', 'border-b-2']"
            :th-root-vertical-classes="['border-r-2', 'px-3']"
            @mouseover="hoverActionOnTableCell"
            @click="clickActionOnTableCell"
        >
            <template #thHorizontal="{ xElement }">
                <p class="rotate-transform__text px-2">
                    {{ xElement }}
                </p>
            </template>
            <template #thVertical="{ yElement }">
                {{ yElement }}
            </template>
            <template #tdData="{ xyElement }">
                {{ xyElement }}
            </template>
        </VCrossTable>

        <StatsPanel class="w-[15%]" :tasks="tasks" :times="times" :current-list="currentList" />
        <Teleport to="body">
            <VModal :is-open="isOpen" :open-modal="openModal" :close-modal="closeModal">
                <template #header>
                    <div class="flex flex-col items-center">
                        <p class="text-white/50 text-4xl font-bold my-4">Welcome to new template!</p>
                        <p class="text-white/70 text-2xl font-medium">
                            Looks like you don’t have an active template...
                        </p>
                        <p class="text-white/90 text-2xl border-t-2 border-b-2 border-neutral-500 font-medium">
                            ...it’s time to create one!
                        </p>
                        <span class="i-carbon:calendar-heat-map opacity-50 my-3 text-6xl"></span>
                    </div>
                </template>
                <template #close>
                    <div class="i-carbon:close close-btn" />
                </template>
                <template #content>
                    <div class="flex flex-col items-center w-full">
                        <button @click="$router.push('/constructor')" class="btn-create-template type1">
                            Create new template
                        </button>
                    </div>
                </template>
            </VModal>
        </Teleport>
    </div>
</template>

<style lang="scss" scoped>
    // Variables
    $color1: white;
    .home {
        @apply bg-no-repeat min-h-screen min-w-full flex p-2;
    }

    .black-gradient {
        background-image: linear-gradient(to right bottom, #000000, #090808, #10100f, #161515, #1a1a19);
    }

    .close-btn {
        @apply text-white/60 text-5xl duration-300 hover:rotate-[45deg] hover:scale-120 hover:cursor-pointer hover:text-white;
    }

    .btn-create-template {
        position: relative;
        padding: 1em 2em;
        border: none;
        background-color: transparent;
        cursor: pointer;
        outline: none;
        font-size: 25px;
        margin: 1em 0.8em;
        color: $color1;
        transition: all 0.6s ease-out;
        font-weight: 500;

        &:hover {
            color: #222;
        }

        &::after,
        &::before {
            content: '';
            display: block;
            position: absolute;
            width: 20%;
            height: 20%;
            border: 2px solid;
            transition: all 0.6s ease;
            border-radius: 2px;
        }

        &::after {
            bottom: 0;
            right: 0;
            border-top-color: transparent;
            border-left-color: transparent;
            border-bottom-color: $color1;
            border-right-color: $color1;
        }
        &::before {
            top: 0;
            left: 0;
            border-bottom-color: transparent;
            border-right-color: transparent;
            border-top-color: $color1;
            border-left-color: $color1;
        }

        &:hover:after,
        &:hover:before {
            width: 100%;
            height: 100%;
            z-index: -20;
            background-color: rgba(222, 222, 222, 0.5);
        }
    }
</style>
