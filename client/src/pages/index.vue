<script setup lang="ts">
    import { Tooltip } from '~/logic/Tooltip'

    const StoreUser = useStoreUser()
    const openStatus = ref(false)

    StoreUser.loadCurrentUser().then(
        ({ isError, errorCode, message }: { isError: boolean; errorCode?: number; message?: string }) => {
            //* Error means that user hasn't default template
            console.log(isError, errorCode, message)

            Tooltip.run({
                error: isError,
                messageSuccess: 'User loaded',
                messageFail: message,
            })
            openStatus.value = isError && errorCode !== 401
        }
    )

    const { yMapper, xMapper, currentList, searcherTds, searcherTable, isTableCell, drawHoverRect } =
        useXTableTodoInit(StoreUser)

    const { generateColor } = useVGenerateColor({ rangeTransparency: [0, 70], colorTransparency: [0, 30] })

    //* To paint table cells by selector
    useVPaintEl({ searcher: searcherTds, generateColor })

    //* Get click listener
    const { clickActionOnTableCell } = useXTableTodoClickAction({
        isClickElement: isTableCell,
        generateColor,
        updateCurrentDay: StoreUser.updateCurrentDay,
        currentList,
    })

    //* Get hover listener
    const { hoverActionOnTableCell } = useVTableHoverOverlay({
        searcherTable,
        isHoverRepaintTriggerEl: isTableCell,
        drawHoverRect,
    })

    onMounted(() => {
        //* Upload data
        StoreUser.restoreCurrentDay(currentList)
    })
</script>

<template>
    <home-layout :x-table="{ width: '85%' }" :stats-panel="{ width: '15%' }">
        <template #xtable>
            <v-x-table
                :x-mapper="xMapper"
                :y-mapper="yMapper"
                :th-root-horizontal-classes="['rotate-transform', 'border-r-2', 'border-b-2']"
                :th-root-vertical-classes="['border-r-2', 'px-3']"
                :td-root-data-classes="['border-separate', 'border-b', 'border-sky-600/40']"
                @mouseover="hoverActionOnTableCell"
                @click="clickActionOnTableCell"
            >
                <template #thHorizontal="{ xElement }">
                    <x-table-th-horizontal> {{ xElement }} </x-table-th-horizontal>
                </template>
                <template #thVertical="{ yElement }">
                    <x-table-th-vertical> {{ yElement }} </x-table-th-vertical>
                </template>
                <template #tdData="{ xyElement }">
                    <x-table-td> {{ xyElement }} </x-table-td>
                </template>
            </v-x-table>
        </template>

        <template #stats-panel>
            <stats-panel
                ts-panel
                :tasks="xMapper.elements"
                :times="yMapper.elements"
                :current-list="currentList"
            ></stats-panel
        ></template>

        <template #modal>
            <Teleport to="body">
                <home-modal :open-status="openStatus"></home-modal>
            </Teleport>
        </template>
    </home-layout>
</template>

<style lang="scss" scoped>
    // Variables
    $color1: white;
    .home {
        @apply bg-no-repeat min-h-screen min-w-full flex p-2;
    }
</style>
