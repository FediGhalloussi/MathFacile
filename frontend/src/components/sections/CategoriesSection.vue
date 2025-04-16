<template>
    <section class="text-center py-16 px-16 bg-white w-full" >
    <h2 class="text-3xl font-bold text-gray-800 mb-10">Pratiquez par catégorie</h2>
    <div :class="gridClasses">
      <CategoryCard
          v-for="category in categories"
          :key="category.id"
          :category="category"
          @click="handleCategoryClick(category.id)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed} from 'vue';
import { useRouter } from 'vue-router';
import CategoryCard from '../common/CategoryCard.vue';
import { useCategories } from '@/composables/useCategories';

const router = useRouter();

const { categories } = useCategories();

// TODO : Mettre le min entre le nb de colonnes prévu et le nombre d'éléments
const gridClasses = computed(() =>
    'grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-5 gap-6'
);

const handleCategoryClick = (categoryId : string) => {
  router.push({ name: 'ExerciseCategory', params: { category: categoryId } });
};
</script>
