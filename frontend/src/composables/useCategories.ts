import { ref, onMounted } from 'vue';
import type { Category } from '@/types/category';
import categoriesData from '@/assets/categories.json';

export function useCategories() {
    const categories = ref<Category[]>([]);

    onMounted(() => {
        categories.value = categoriesData.categories;
    });

    return { categories };
}
