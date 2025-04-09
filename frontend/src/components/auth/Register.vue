<template>
  <div class="bg-blue-100 rounded-3xl m-4 shadow-lg flex flex-col min-h-screen">
    <AppHeader />
    <main class="flex-grow max-w-2xl mx-auto px-4 py-8 text-center">
      <div class="bg-white py-10 px-6 rounded-xl shadow-md">
        <h2 class="text-4xl font-bold text-blue-800 mb-6">Créer un compte</h2>
        <p class="text-lg text-gray-600 mb-8">Veuillez remplir les informations pour vous inscrire.</p>

        <!-- Formulaire d'inscription -->
        <form @submit.prevent="handleRegister" class="space-y-6">
          <div>
            <label for="name" class="block text-left text-lg text-gray-700 mb-2">Nom</label>
            <input
                type="text"
                id="name"
                v-model="name"
                placeholder="Entrez votre nom"
                required
                class="w-full px-4 py-2 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

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

          <div>
            <label for="confirmPassword" class="block text-left text-lg text-gray-700 mb-2">Confirmer le mot de passe</label>
            <input
                type="password"
                id="confirmPassword"
                v-model="confirmPassword"
                placeholder="Confirmez votre mot de passe"
                required
                class="w-full px-4 py-2 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <input type="checkbox" id="terms" v-model="acceptedTerms" class="mr-2" />
              <label for="terms" class="text-sm text-gray-600">
                J'accepte les
                <a
                    href="/terms"
                    target="_blank"
                    rel="noopener"
                    class="text-blue-600 hover:text-blue-800"
                >
                  conditions générales
                </a>
              </label>
            </div>
          </div>

          <button
              type="submit"
              :disabled="!isFormValid || isLoading"
              class="w-full py-2 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isLoading">Inscription...</span>
            <span v-else>S'inscrire</span>
          </button>

          <div v-if="errorMessage" class="text-red-600 mt-4">{{ errorMessage }}</div>
        </form>

        <div class="mt-6">
          <p class="text-sm text-gray-600">
            Vous avez déjà un compte ?
            <RouterLink to="/login" class="text-blue-600 hover:text-blue-800">Se connecter</RouterLink>
          </p>
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import AppHeader from '@/components/layout/AppHeader.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const acceptedTerms = ref(false);
const errorMessage = ref('');
const isLoading = ref(false);

const isFormValid = computed(() => {
  return (
      name.value &&
      email.value &&
      password.value &&
      confirmPassword.value &&
      password.value === confirmPassword.value &&
      acceptedTerms.value
  );
});

const handleRegister = async () => {
  if (!isFormValid.value) return;

  errorMessage.value = '';
  isLoading.value = true;

  const result = await authStore.register(name.value, email.value, password.value);
  isLoading.value = false;

  if (result.success) {
    router.push('/');
  } else {
    errorMessage.value = result.message || "Une erreur est survenue. Veuillez réessayer.";
  }
};
</script>