<template>
  <div class="min-h-[calc(100vh-2rem)] m-4 bg-blue-100 rounded-3xl shadow-lg flex flex-col">
    <AppHeader />
    <main class="flex-grow flex items-center justify-center max-w-2xl mx-auto px-4 py-8 text-center">
      <div class="bg-gray-100 py-10 px-6 rounded-xl shadow-md">

        <div class="text-6xl animate-bounce mb-4">🚧</div>

        <h2 class="text-4xl font-bold text-blue-800 mb-4">Cette page est en préparation !</h2>
        <p class="text-xl text-gray-800 mb-6" aria-live="polite">
          Nous travaillons activement dessus. Restez à l'écoute ! 🔧
        </p>

        <div class="flex flex-col items-center space-y-4">
          <button
              @click="goBack"
              class="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-300 cursor-pointer"
          >
            Retour à la page précédente
          </button>

          <p class="text-sm text-gray-500 mt-4">Merci de votre patience !</p>
        </div>

      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import AppHeader from '@/components/layout/AppHeader.vue';
import AppFooter from '@/components/layout/AppFooter.vue';

const router = useRouter();

const goBack = () => {
  router.back();
};
</script>
