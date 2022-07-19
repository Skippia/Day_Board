<script setup lang="ts"></script>

<template>
    <div class="showcase neon-shadow">
        <p class="showcase__info">
            <slot />
        </p>
    </div>
</template>

<style lang="scss" scoped>
    .showcase {
        @apply border-white border-solid rounded-xl border-2 text-5xl perspect-[600px] h-[30vh] w-4/5 flex items-center justify-center preserve-3d;
        animation: 8s rotating 0s linear infinite;
        box-shadow: rgba(0, 0, 0, 0.6) 0px 3px 6px, rgba(0, 0, 0, 0.63) 0px 3px 6px;
    }
    .showcase__info {
        @apply preserve-3d translate-z-8;
    }
    .neon-shadow {
        text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #fff, 0 0 40px #0ff, 0 0 80px #0ff, 0 0 90px #0ff,
            0 0 100px #0ff, 0 0 150px #0ff;
    }
    @keyframes rotating {
        0% {
            transform: rotateY(0deg);
        }

        25% {
            transform: rotateY(50deg);
        }

        50% {
            transform: rotateY(0deg);
        }

        75% {
            transform: rotateY(-50deg);
        }

        to {
            transform: rotateY(0deg);
        }
    }
</style>
