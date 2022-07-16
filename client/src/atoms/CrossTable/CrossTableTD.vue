<script setup lang="ts">
    interface Props {
        attributes?: Array<{
            name: string
            value: string
        }>
        rootClasses?: Array<string>
    }
    const props = defineProps<Props>()

    const td = ref<HTMLElement>()

    onMounted(() => {
        props.attributes?.forEach((attribute) => {
            td.value!.setAttribute(attribute.name, attribute.value)
        })
    })
</script>

<template>
    <td ref="td" :class="rootClasses">
        <slot name="default" />
    </td>
</template>

<style lang="scss" scoped>
    td {
        border-bottom: 0.5px solid rgba(24, 116, 205, 0.3);
        border-collapse: separate;
        font-size: 14px;
    }
</style>
