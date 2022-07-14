<script setup lang="ts">
const StoreUser = useStoreUser()
const searcherTds = () => [...document.querySelectorAll('td')].filter(el => !el.classList.contains('time'))
const searcherTable = () => document.querySelector('table')
const isTableCell = UTIL.createSelector({ tagName: 'td' })

const {
  yMapper,
  xMapper,
  times,
  tasks,
  currentList,
} = useInitCrossTableValues(StoreUser)

const { generateColor } = useGenerateColor({ rangeTransparency: [0, 70], colorTransparency: [0, 30] })

//* To paint table cells by selector
usePaintTableCell({ searcher: searcherTds, generateColor })

//* Get click listener
const { clickActionOnTableCell }
  = useTableClickAction(
    { isClickElement: isTableCell, generateColor, updateCurrentDay: StoreUser.updateCurrentDay, currentList },
  )

//* Get hover listener
const { hoverActionOnTableCell } = useTableHoverAction({ searcherTable, isHoverElement: isTableCell })

onMounted(() => {
  //* Upload data
  StoreUser.restoreCurrentDay(currentList)
})
</script>

<template>
  <div class="home black-gradient">
    <CrossTable
      ref="table" class="w-[85%]" :x-mapper="xMapper" :y-mapper="yMapper"
      :th-root-horizontal-classes="['rotate-transform', 'border-r-2', 'border-b-2']"
      :th-root-vertical-classes="['border-r-2', 'px-3']" @mouseover="(hoverActionOnTableCell)"
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
    </CrossTable>

    <StatsPanel class="w-[15%]" :tasks="tasks" :times="times" :current-list="currentList" />
  </div>
</template>

<style lang="scss">
.home {
  @apply bg-no-repeat min-h-screen min-w-full flex p-2;
}

.black-gradient {
  background-image: linear-gradient(to right bottom, #000000, #090808, #10100f, #161515, #1a1a19);
}
</style>
