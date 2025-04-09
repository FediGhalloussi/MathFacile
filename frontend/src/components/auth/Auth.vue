<template>
  <div class="bg-blue-100 rounded-3xl m-4 shadow-lg flex flex-col min-h-screen">
    <AppHeader />
    <main class="flex-grow max-w-2xl mx-auto px-4 py-8 text-center">
      <div class="bg-white py-10 px-6 rounded-xl shadow-md">
        <h2 class="text-4xl font-bold text-blue-800 mb-6">Bienvenue</h2>
        <p class="text-lg text-gray-600 mb-8">Veuillez vous connecter pour accéder à votre compte.</p>

        <!-- Formulaire de connexion -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="block text-left text-lg text-gray-700 mb-2">Adresse e-mail</label>
            <input
                type="email"
                id="email"
                v-model="email"
                placeholder="Entrez votre email"
                required
                class="w-full px-4 py-2 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label for="password" class="block text-left text-lg text-gray-700 mb-2">Mot de passe</label>
            <input
                type="password"
                id="password"
                v-model="password"
                placeholder="Entrez votre mot de passe"
                required
                class="w-full px-4 py-2 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <input type="checkbox" id="remember" v-model="rememberMe" class="mr-2" />
              <label for="remember" class="text-sm text-gray-600">Se souvenir de moi</label>
            </div>
            <RouterLink to="/forgot-password" class="text-sm text-blue-600 hover:text-blue-800">
              Mot de passe oublié ?
            </RouterLink>
          </div>

          <button
              type="submit"
              :disabled="isLoading"
              class="w-full py-2 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isLoading">Connexion...</span>
            <span v-else>Se connecter</span>
          </button>

          <!-- Afficher l'erreur si la connexion échoue -->
          <div v-if="errorMessage" class="mt-4 text-red-600">
            {{ errorMessage }}
          </div>
        </form>

        <div class="mt-6">
          <p class="text-sm text-gray-600">
            Vous n'avez pas de compte ?
            <RouterLink to="/register" class="text-blue-600 hover:text-blue-800">S'inscrire</RouterLink>
          </p>
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppHeader from '@/components/layout/AppHeader.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const errorMessage = ref('');
const isLoading = ref(false);

const handleLogin = async () => {
  errorMessage.value = '';
  isLoading.value = true;

  const result = await authStore.login(email.value, password.value, rememberMe.value);
  isLoading.value = false;

  if (result.success) {
    router.push('/');
  } else {
    errorMessage.value = result.message || 'Erreur lors de la connexion.';
  }
};
</script>