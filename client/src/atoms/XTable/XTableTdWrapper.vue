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
            td.value?.setAttribute(attribute.name, attribute.value)
        })
    })
</script>

<template>
    <td ref="td" :class="rootClasses">
        <slot />
    </td>
</template>
