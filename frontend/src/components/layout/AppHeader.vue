<template>
  <header
      class="flex justify-between items-center pl-15 pr-15 pb-4 pt-4 border-b border-gray-300 bg-blue-950 rounded-t-2xl">
    <!-- Logo -->
    <router-link to="/" class="flex items-center space-x-2">
      <img
          :src="logoImg"
          alt="Logo MathFacile"
          class="h-10 w-auto"
      />
      <span class="text-3xl font-bold text-white hidden sm:inline">MathsFacile</span>
    </router-link>

    <!-- Navigation -->
    <nav class="flex space-x-6 md:space-x-10">
      <router-link
          v-for="category in categories"
          :key="category.id"
          :to="{ name: 'ExerciseCategory', params: { category: category.id } }"
          class="text-gray-200 font-bold hover:text-blue-700 transition-colors duration-300"
      >
        {{ category.name }}
      </router-link>
    </nav>

    <!-- Si non connecté -->
    <router-link
        v-if="!authStore.isAuthenticated"
        to="/login"
        class="bg-blue-800 text-white px-5 py-2 rounded-full font-bold hover:bg-blue-800 transition-colors duration-300"
        aria-label="Se connecter"
    >
      Connexion
    </router-link>

    <!-- Si connecté -->
    <div v-else class="text-right text-blue-400 font-bold flex flex-col items-end">
      <span>Bienvenue, {{ authStore.user?.name }}</span>
      <button
          @click="authStore.logout"
          class="text-xs text-gray-300 hover:underline hover:text-white transition"
      >
        Se déconnecter
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import {useAuthStore} from '@/stores/auth.ts';
import categoriesData from '@/assets/categories.json';
import logoImg from '@/assets/images/Logo_MathFacile.png';
import { useCategories } from '@/composables/useCategories';
const authStore = useAuthStore();

const { categories } = useCategories();

categories.value = categoriesData.categories;

</script>