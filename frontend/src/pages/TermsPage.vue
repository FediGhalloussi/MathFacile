<template>
  <div class="min-h-[calc(100vh-2rem)] m-4 bg-blue-100 rounded-3xl shadow-lg flex flex-col">
    <AppHeader />
    <main role="main" class="flex-grow max-w-3xl mx-auto px-6 py-12 text-gray-800">
      <section class="space-y-6 bg-white p-6 rounded-2xl shadow-md">
        <h1 class="text-4xl font-bold text-center text-blue-800 mb-10">Conditions d’utilisation</h1>

        <p>
          En utilisant cette application, vous acceptez les conditions générales d’utilisation décrites ci-dessous. Cette application a pour but de vous aider à pratiquer les mathématiques de manière interactive.
        </p>

        <p>
          Les exercices proposés sont générés automatiquement. Bien que nous fassions de notre mieux pour garantir leur exactitude, des erreurs peuvent parfois se produire.
          <RouterLink to="/contact" class="text-blue-600 hover:underline"> Contactez-nous</RouterLink> si vous en trouvez !
        </p>

        <p>
          Aucune donnée personnelle n’est collectée ou stockée par cette application. Vos réponses restent locales et ne sont jamais envoyées à un serveur.
        </p>

        <p>
          Le contenu et le design de cette application sont protégés par les droits d’auteur. Toute reproduction ou redistribution est interdite sans autorisation préalable.
        </p>

        <p>
          Cette application est fournie « telle quelle », sans garantie d’aucune sorte. L’auteur ne saurait être tenu responsable de l’utilisation qui en est faite.
        </p>

        <p class="italic text-center text-gray-600">
          Merci d’utiliser notre application ! 🚀
        </p>
      </section>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
</script>