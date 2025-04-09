<template>
  <footer class="bg-blue-900 text-white text-center py-5 rounded-b-2xl" role="contentinfo">
    <p class="text-sm sm:text-base">
      &copy; {{ currentYear }} MathsFacile. Tous droits réservés.
      <RouterLink to="/terms" class="underline text-blue-300 hover:text-white ml-2">
        Mentions légales
      </RouterLink>
    </p>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const currentYear = computed(() => new Date().getFullYear());
</script>
