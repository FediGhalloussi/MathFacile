<template>
  <div
      class="bg-blue-100 px-6 py-4 md:py-8 rounded-xl text-center transition-transform duration-300 shadow-md cursor-pointer hover:-translate-y-1 hover:shadow-lg min-w-[140px] max-w-[200px] w-full"
  >
    <div class="text-2xl text-blue-800 font-mono flex items-center justify-center min-h-[50px]" v-html="renderedIcon">
    </div>
    <p class="font-bold text-gray-700 mt-3 text-base sm:text-lg md:text-xl break-words leading-snug" >
      {{ category.name }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Category } from '@/types/category';
import { onMounted, ref } from 'vue'
const props = defineProps<{ category: Category }>()
import katex from 'katex'
import 'katex/dist/katex.min.css'

const renderedIcon = ref('');


onMounted(() => {
  renderedIcon.value = katex.renderToString(props.category.icon || '', {
    throwOnError: false,
  })
})
</script>
