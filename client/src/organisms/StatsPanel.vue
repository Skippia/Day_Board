<script setup lang="ts">
const StoreUser = useStoreUser()
const tasks = StoreUser.getTasks
const dayData = StoreUser.getDayData

const getCurrentTaskAmount = computed(() => dayData.length)
</script>

<template>
  <div class="stats">
    <div class="clear-btn button-cyberpunk" @click="StoreUser.clearLocalStorage">
      Clear
    </div>

    <div class="task-wrapper neon-shadow">
      <p class="task-wrapper__info">
        {{ getCurrentTaskAmount }}/ {{ tasks.length }}
      </p>
    </div>

    <div class="calc-btn button-cyberpunk">
      Calc today
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stats {
  @apply flex py-3 flex-col justify-between items-center perspect-[1200px];
  background-color: rgba(22, 22, 22, 0.9);
}
.task-wrapper {
  @apply border-white border-solid rounded-xl border-2 text-5xl perspect-[600px] h-[30vh] w-4/5 flex items-center justify-center preserve-3d;
  animation: 8s chilling 0s linear infinite;
  box-shadow: rgba(0, 0, 0, 0.6) 0px 3px 6px,
    rgba(0, 0, 0, 0.63) 0px 3px 6px;
}
.task-wrapper__info {
  @apply preserve-3d translate-z-8;
}

@keyframes chilling {
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

.neon-shadow {
  text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #fff, 0 0 40px #0ff, 0 0 80px #0ff, 0 0 90px #0ff, 0 0 100px #0ff,
    0 0 150px #0ff;
}

.clear-btn,
.calc-btn {
  @apply w-4/5 h-[20vh];
}
</style>
