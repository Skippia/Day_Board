<script setup lang="ts">
import type { MapperForCrossTable } from '~/types/TCrossTable'

interface Props {
  xMapper: MapperForCrossTable
  yMapper: MapperForCrossTable
  thRootHorizontalClasses?: Array<string>
  thRootVerticalClasses?: Array<string>
  tdRootDataClasses?: Array<string>
  //* Render content within each cell of table
  contentFunction?: (sourceX: string, sourceY: string) => string
}

// @ts-expect-error really is used
const props = defineProps<Props>()
</script>

<template>
  <table ref="table" class="table">
    <thead>
      <tr>
        <th class="empty-cell" />
        <CrossTableTH
          v-for="xElement of xMapper.elements" :key="xElement"
          :attributes="[{ name: xMapper.attributeNameTh, value: xMapper.transformFnTh(xElement) }]"
          :root-classes="thRootHorizontalClasses"
        >
          <slot name="thHorizontal" :x-element="xElement" />
        </CrossTableTH>
      </tr>
    </thead>
    <tbody>
      <tr v-for="yElement of yMapper.elements" :key="yElement">
        <CrossTableTH
          :attributes="[{ name: yMapper.attributeNameTh, value: yMapper.transformFnTh(yElement) }]"
          :root-classes="thRootVerticalClasses"
        >
          <slot name="thVertical" :y-element="yElement" />
        </CrossTableTH>
        <CrossTableTD
          v-for="xElement of xMapper.elements" :key="xElement" :attributes="[
            { name: yMapper.attributeNameTd, value: yMapper.transformFnTd(yElement) },
            { name: xMapper.attributeNameTd, value: xMapper.transformFnTd(xElement) },
          ]" :root-classes="tdRootDataClasses"
        >
          <slot v-if="contentFunction" name="tdData" :xy-element="contentFunction!(xElement, yElement)" />
        </CrossTableTD>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
.container {
  background-image: linear-gradient(to right bottom, #000000, #090808, #10100f, #161515, #1a1a19);
  background-repeat: no-repeat;
  min-height: 100vh;
  min-width: 100%;
  display: flex;
}

table {
  padding: 5px 0;
  border-collapse: separate;
  font-size: 15px;
  border-bottom: none;
}

.empty-cell {
  border-left: none !important;
}
</style>
