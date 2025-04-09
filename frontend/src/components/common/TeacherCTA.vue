<template>
  <section class="group flex flex-col md:flex-row items-center justify-between bg-white p-6 sm:p-10">
    <!-- Bloc texte -->
    <div class="text-center md:text-left max-w-xl">
      <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
        Vous êtes enseignant ?
      </h2>
      <p class="text-base sm:text-lg text-gray-600 mt-2">
        Proposez vos exercices et aidez les élèves à progresser.
      </p>
      <RouterLink
          to="/proposer-exercice"
          class="mt-4 inline-block bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
          aria-label="Accéder à la page pour proposer un exercice"
      >
        Proposer un exercice
      </RouterLink>
    </div>

    <div
        class="hidden md:flex flex-col items-center w-40"
        aria-hidden="true"
    >
      <div
          class="h-2 w-full bg-gray-300 rounded mb-4 transition-all duration-300 group-hover:w-3/4 group-hover:bg-blue-400"
      ></div>
      <div
          class="h-2 w-3/4 bg-gray-300 rounded transition-all duration-300 group-hover:w-full group-hover:bg-blue-500"
      ></div>
    </div>
  </section>
</template>
