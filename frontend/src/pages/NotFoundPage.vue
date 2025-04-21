<template>
  <div class="min-h-[calc(100vh-2rem)] m-4 bg-blue-100 rounded-3xl shadow-lg flex flex-col">
    <AppHeader />

    <main class="flex-grow flex items-center justify-center max-w-2xl mx-auto px-4 py-8 text-center">
      <div class="bg-gray-100 py-10 px-6 rounded-xl shadow-md">
        <div class="text-[80px] animate-bounce">🔍</div>

        <h1 class="text-5xl sm:text-6xl font-bold text-blue-800">Page Introuvable</h1>
        <p class="my-4 text-lg text-gray-600">Oups ! Cette page n'existe pas.</p>

        <RouterLink
            to="/"
            class="my-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Retour à l'accueil
        </RouterLink>

        <p class="text-sm mt-4 text-gray-500">
          Vous pensez que c’est une erreur ?
          <RouterLink to="/contact" class="underline hover:text-blue-700">
            Contactez-nous
          </RouterLink>
        </p>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
</script>
