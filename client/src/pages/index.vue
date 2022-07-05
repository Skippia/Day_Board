<script setup lang="ts">
import { useStoreUser } from '../stores/useStoreUser'
import StatsPanel from '~/components/StatsPanel/StatsPanel.vue'
import { usePaintTableCell } from '~/hooks/usePaintTableCell'
import { useInitStartValues } from '~/hooks/useInitStartValues'
import { useTableFireAction } from '~/hooks/useTableFireAction'
import { useTableHoverAction } from '~/hooks/useTableHoverAction'
// import CrossTable from '~/modules/__reusable__/CrossTable/CrossTable.vue'
import { useGenerateColor } from '~/hooks/useGenerateColor'

const StoreUser = useStoreUser()

const {
  searcherTds,
  searcherTable,
  rangeTransparency,
  colorTransparency,
  yMapper,
  xMapper,
  times,
  tasks,
  currentList,
} = useInitStartValues(StoreUser)

const { generateColor } = useGenerateColor({ rangeTransparency, colorTransparency })

//* To paint table cells
usePaintTableCell({ searcher: searcherTds, generateColor })

//* Get fire listener
const { fireActionOnTableCell } = useTableFireAction(generateColor, StoreUser.updateCurrentDay, currentList)

//* Get hover listener
const { hoverActionOnTableCell } = useTableHoverAction(searcherTable)

onMounted(() => {
  //* Upload data
  StoreUser.restoreCurrentDay(currentList)
})
</script>

<template>
  <div class="container bg-no-repeat min-h-screen min-w-full flex p-2">
    <CrossTable
      ref="table" class="w-[85%]" :x-mapper="xMapper" :y-mapper="yMapper"
      :th-root-horizontal-classes="['rotate-transform', 'border-r-2', 'border-b-2']"
      :th-root-vertical-classes="['border-r-2', 'px-3']" @mouseover="hoverActionOnTableCell"
      @click="fireActionOnTableCell"
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
    </CrossTable>

    <StatsPanel class="w-[15%]" :tasks="tasks" :times="times" :current-list="currentList" />
  </div>
</template>

<style lang="scss">
.container {
  background-image: linear-gradient(to right bottom, #000000, #090808, #10100f, #161515, #1a1a19);
}
</style>
