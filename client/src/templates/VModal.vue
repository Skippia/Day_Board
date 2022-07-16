<script setup lang="ts">
    const props = defineProps<{
        openModal: () => void
        closeModal: () => void
        isOpen: boolean
    }>()
</script>

<template>
    <Transition name="modal" mode="out-in" appear>
        <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
            <div class="modal">
                <div class="modal__header">
                    <slot name="header">
                        <p class="text-black">Text header</p>
                    </slot>
                    <div class="modal__close" @click="closeModal">
                        <slot name="close" />
                    </div>
                </div>
                <div class="modal__content">
                    <slot name="content" />
                </div>
            </div>
        </div>
    </Transition>
</template>

<style lang="scss" scoped>
    @import '~/assets/styles/transitionAnimation.scss';
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
    }

    .modal {
        @apply flex flex-col absolute left-1/2 top-1/2 min-w-1/2 min-h-1/2 rounded-2xl;
        transform: translate(-50%, -50%);
        background: rgba(222, 222, 222, 0.5);
        box-shadow: rgba(217, 205, 240, 0.5) 0px 20px 30px -10px;
    }

    .modal__header {
        @apply flex justify-center items-center border-2 border-black h-20;
    }

    .modal__content {
        @apply flex justify-between items-center;
        flex: 1 0 0;
    }
    .modal__close {
        @apply text-black absolute right-3;
    }
</style>
