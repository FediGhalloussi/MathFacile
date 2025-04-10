<template>
  <section class="flex flex-col-reverse md:flex-row items-center justify-between py-12 px-6 md:px-16 gap-8 md:gap-16">
    <!-- Texte -->
    <div class="flex-2 text-center md:text-left">
      <h1 class="text-[clamp(2rem,6vw,4rem)] font-bold text-gray-800 leading-tight mb-8">
        Apprenez les maths<br />facilement<br />et à votre rythme !
      </h1>
      <router-link
          to="/exercice"
          class="bg-blue-700 text-white py-4 px-8 rounded-full text-lg font-bold hover:bg-blue-800 transition-colors duration-300"
      >
        Commencer les exercices
      </router-link>
    </div>

    <!-- Image -->
    <div class="relative flex-1 flex justify-center items-center">
      <img
          :src="laptopImg"
          alt="Laptop montrant des formules"
          class="max-w-[280px] md:max-w-[350px] w-full"
      />
      <div class="absolute top-10 right-6 md:right-24 py-2 px-4 text-3xl md:text-4xl font-mono text-gray-800 rotate-1 ">
        √x a²+b
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import laptopImg from '@/assets/images/laptop.png';
</script>
