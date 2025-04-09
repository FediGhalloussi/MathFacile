<template>
  <div class="landing-page-view bg-blue-100 rounded-3xl m-4 shadow-lg flex flex-col min-h-screen">
    <AppHeader/>
    <main class="main-content w-full">
      <HeroSection/>
      <CategoriesSection/>
      <SocialProof/>
      <TeacherCTA/>
    </main>
    <AppFooter/>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '../components/layout/AppHeader.vue';
import HeroSection from '../components/sections/HeroSection.vue';
import CategoriesSection from '../components/sections/CategoriesSection.vue';
import SocialProof from '../components/common/SocialProof.vue';
import TeacherCTA from '../components/common/TeacherCTA.vue';
import AppFooter from '../components/layout/AppFooter.vue';
</script>
