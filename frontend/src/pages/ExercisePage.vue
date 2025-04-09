<template>
  <div class="bg-blue-100 rounded-3xl m-4 shadow-lg flex flex-col min-h-screen">
    <AppHeader />
    <main class="flex-grow max-w-2xl mx-auto px-4 py-8 text-center">
      <div class="bg-gray-100 py-10 px-6 sm:px-10 rounded-xl shadow-md">
        <h2 class="text-4xl font-bold text-blue-800 mb-6">Exercice</h2>

        <div v-if="currentExercise">
          <div class="text-2xl text-gray-800 mb-6" v-html="currentExercise.text + '<br/>' + renderMath(currentExercise.question)" />

          <div class="flex flex-col items-center space-y-4">
            <label for="answer" class="sr-only">Votre réponse</label>
            <input
                id="answer"
                type="text"
                v-model.trim="userAnswer"
                placeholder="Votre réponse..."
                @keyup.enter="handleEnter"
                :disabled="isValidated"
                ref="answerInput"
                class="text-lg w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-200"
            />

            <button
                @click="checkAnswer"
                :disabled="!userAnswer || isValidated"
                class="px-6 py-2 font-bold text-white rounded-lg transition-colors duration-300"
                :class="{
                'bg-blue-700 hover:bg-blue-800': userAnswer && !isValidated,
                'bg-gray-400 cursor-not-allowed': !userAnswer || isValidated
              }"
            >
              Valider
            </button>
          </div>

          <div
              v-if="isValidated"
              role="alert"
              class="mt-6 p-4 rounded-lg text-lg font-semibold"
              :class="feedbackClass"
              v-html="renderedFeedback"
          />

          <button
              v-if="isValidated"
              @click="nextExercise"
              class="mt-6 px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Exercice Suivant
          </button>
        </div>

        <div v-else>
          <div v-if="loadingError" class="text-2xl text-gray-800 mb-6">{{ loadingError }}</div>
          <div v-else class="text-xl text-gray-600">Chargement de l'exercice...</div>
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';
import AppHeader from '@/components/layout/AppHeader.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
import { useExercises } from '@/composables/useExercises';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const {
  currentExercise,
  userAnswer,
  isValidated,
  isCorrect,
  feedback,
  expectedResult,
  answerInput,
  loadingError,
  feedbackClass,
  checkAnswer,
  nextExercise,
  loadExercise,
} = useExercises();

const renderMath = (equation: string) => {
  return katex.renderToString(equation, { throwOnError: false });
};

const renderedFeedback = computed(() => {
  let res = feedback.value;
  if (!isCorrect.value) {
    res += katex.renderToString(expectedResult.value, { throwOnError: false });
  }
  return res;
});

const handleEnter = () => {
  if (isValidated.value) {
    nextExercise();
  } else {
    checkAnswer();
  }
};

const onGlobalKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    handleEnter();
  }
};

onMounted(() => {
  loadExercise();
  window.addEventListener('keydown', onGlobalKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', onGlobalKeyDown);
});
</script>
