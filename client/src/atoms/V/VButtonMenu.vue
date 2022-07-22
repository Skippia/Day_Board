<script setup lang="ts"></script>

<template>
    <div class="clear-btn button-cyberpunk">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
    .button-cyberpunk {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.8em 1em;
        position: relative;
        text-transform: uppercase;
        border: solid;
        border-color: #07547d;
        border-radius: 1%;
        font-size: 1.5rem;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        text-shadow: 0 0 10px #2196f3, 0 0 40px #2196f3, 0 0 80px #2196f3;
    }
</style>
