<template>
  <transition name="fade">
    <div
        v-if="flash.message"
        class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 bg-red-400 text-white font-semibold rounded-xl shadow-md"
    >
      {{ flash.message }}
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useFlashStore } from '@/stores/flash.ts';

const flash = useFlashStore();
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
