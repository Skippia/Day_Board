<script setup lang="ts"></script>

<template>
    <div class="auth__container">
        <div class="auth-content__wrapper glass-effect">
            <slot />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .auth__container {
        background: center/cover url('../../assets/img/LoginBg.jpg');
        @apply w-full h-screen flex justify-center items-center;
    }
    .auth-content__wrapper {
        @apply absolute flex justify-center items-center max-w-[500px] w-full max-h-[75vh] h-full
        rounded-xl overflow-hidden;
    }
    .auth-content__content-bg {
        @apply absolute h-full min-w-[200%] rounded-xl translate-x-[-30px];
    }
    .glass-effect {
        background: linear-gradient(90deg, rgba(2, 2, 2, 0.8), rgba(222, 222, 222, 0.2));
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        border-radius: 32px;
        backdrop-filter: blur(1px);
    }
</style>
