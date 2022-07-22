<script setup lang="ts">
    import type { IMapperForXTable } from '~/types/types'

    interface Props {
        xMapper: IMapperForXTable
        yMapper: IMapperForXTable
        thRootHorizontalClasses?: Array<string>
        thRootVerticalClasses?: Array<string>
        tdRootDataClasses?: Array<string>
        //* Render content within each cell of table
        contentFunction?: (sourceX: string, sourceY: string) => string
    }

    const props = defineProps<Props>()
</script>

<template>
    <table ref="table" class="table__container">
        <thead>
            <tr>
                <th class="empty-cell" />
                <x-table-th-wrapper
                    v-for="xElement of xMapper.elements"
                    :key="xElement"
                    :attributes="[
                        {
                            name: xMapper.attributeNameTh,
                            value: xMapper.transformFnTh(xElement),
                        },
                    ]"
                    :root-classes="thRootHorizontalClasses"
                >
                    <slot name="thHorizontal" :x-element="xElement" />
                </x-table-th-wrapper>
            </tr>
        </thead>
        <tbody>
            <tr v-for="yElement of yMapper.elements" :key="yElement">
                <!-- //! TODD: rewrite to render fn -->
                <x-table-th-wrapper
                    :attributes="[
                        {
                            name: yMapper.attributeNameTh,
                            value: yMapper.transformFnTh(yElement),
                        },
                    ]"
                    :root-classes="thRootVerticalClasses"
                >
                    <slot name="thVertical" :y-element="yElement" />
                </x-table-th-wrapper>
                <x-table-td-wrapper
                    v-for="xElement of xMapper.elements"
                    :key="xElement"
                    :attributes="[
                        {
                            name: yMapper.attributeNameTd,
                            value: yMapper.transformFnTd(yElement),
                        },
                        {
                            name: xMapper.attributeNameTd,
                            value: xMapper.transformFnTd(xElement),
                        },
                    ]"
                    :root-classes="tdRootDataClasses"
                >
                    <slot v-if="contentFunction" name="tdData" :xy-element="contentFunction(xElement, yElement)" />
                </x-table-td-wrapper>
            </tr>
        </tbody>
    </table>
</template>

<style lang="scss" scoped>
    .table__container {
        @apply border-b-0 border-separate w-full h-full;
    }

    .empty-cell {
        border-left: none !important;
    }
</style>
