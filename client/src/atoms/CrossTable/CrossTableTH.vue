<script setup lang="ts">
    interface Props {
        attributes?: Array<{
            name: string
            value: string
        }>
        rootClasses?: Array<string>
    }
    const props = defineProps<Props>()

    const th = ref<HTMLElement>()

    onMounted(() => {
        props.attributes?.forEach((attribute) => {
            th.value!.setAttribute(attribute.name, attribute.value)
        })
    })
</script>

<template>
    <th ref="th" :class="rootClasses">
        <slot />
    </th>
</template>

<style lang="scss" scoped>
    th {
        font-size: 14px;
    }
</style>
