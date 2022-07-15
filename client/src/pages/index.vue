<script setup lang="ts">
import { useModal } from '~/logic/useModal'

const StoreUser = useStoreUser()
// @ts-expect-error  ???
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

const { isOpen, openModal, closeModal } = useModal()
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
    <Teleport to="body">
      <VModal :is-open="isOpen" :open-modal="openModal" :close-modal="closeModal">
        <template #header>
          <p class="text-black font-medium">
            Welcome to new template!
          </p>
        </template>
        <template #close>
          <div class="i-carbon:close close" />
        </template>
        <template #content>
          <div class="bg-emerald-300 p-4 flex flex-col items-center justify-center w-full">
            <div class="text-white text-4xl">
              Hello! I'm content
            </div>
            <div class="w-1/2 bg-red-300 h-20" />
          </div>
        </template>
      </VModal>
    </Teleport>
    <!-- <div>
      <button p-5 text-black bg-indigo-300 @click="openModal">
        OPEN
      </button>
      <button p-5 text-black bg-yellow-300 @click="closeModal">
        CLOSE
      </button>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
.home {
  @apply bg-no-repeat min-h-screen min-w-full flex p-2;
}

.black-gradient {
  background-image: linear-gradient(to right bottom, #000000, #090808, #10100f, #161515, #1a1a19);
}

.close {
  @apply text-black/70 text-6xl duration-300 hover:rotate-[45deg] hover:scale-120 hover:cursor-pointer hover:text-black;
}
</style>
