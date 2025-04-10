import { ref, computed, nextTick, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { generateExercise, loadWasmModule, verifyAnswer } from '@/utils/wasmLoader';
import { useCategories } from "./useCategories.ts";

export function useExercises() {
    const router = useRouter();
    const route = useRoute();

    const { categories } = useCategories();
    const categoryId = computed(() => route.params.category);

    const currentExercise = ref<{ text: string; question: string } | null>(null);
    const userAnswer = ref('');
    const isValidated = ref(false);
    const isCorrect = ref(false);
    const feedback = ref('');
    const expectedResult = ref('');
    const exercise = ref<string | null>(null);
    const wasmModule = ref<any | null>(null);
    const loadingError = ref<string | null>(null);
    const answerInput = ref<HTMLInputElement | null>(null);

    const feedbackClass = computed(() => ({
        'text-green-700 bg-green-100 border border-green-500': isCorrect.value,
        'text-red-700 bg-red-100 border border-red-500': !isCorrect.value,
    }));

    const loadModuleIfNeeded = async () => {
        if (!wasmModule.value) {
            try {
                wasmModule.value = await loadWasmModule();
                loadingError.value = null;
            } catch (error) {
                loadingError.value = "Échec du chargement du module WebAssembly. Veuillez réessayer plus tard.";
                console.error(error);
            }
        }
    };

    const loadExercise = async () => {
        await loadModuleIfNeeded();

        let catId = typeof categoryId.value === 'string' ? categoryId.value : null;
        if (!catId || !categories.value.find(cat => cat.id === catId)) {
            catId = "ln-eqn";
            router.replace({ name: 'ExerciseCategory', params: { category: catId } });
            return;
        }

        if (wasmModule.value) {
            const resultPtr = generateExercise(wasmModule.value, catId);
            exercise.value = resultPtr;

            if (resultPtr === 'Exercice non reconnu') {
                currentExercise.value = null;
                loadingError.value = "Ce type d'exercice n'est pas encore disponible. Revenez bientôt !";
                return;
            }

            const categoryMeta = categories.value.find(cat => cat.id === catId)!;
            currentExercise.value = {
                text: categoryMeta.description ?? '',
                question: resultPtr,
            };

            userAnswer.value = '';
            feedback.value = '';
            isValidated.value = false;

            nextTick(() => answerInput.value?.focus());
        } else {
            loadingError.value = "Le module WebAssembly n'a pas pu être chargé.";
            isValidated.value = true;
        }
    };

    const checkAnswer = async () => {
        await loadModuleIfNeeded();
        if (!userAnswer.value || !currentExercise.value) return;

        if (exercise.value && wasmModule.value) {
            const resStr = verifyAnswer(wasmModule.value, <string>categoryId.value, exercise.value, userAnswer.value);
            const res = JSON.parse(resStr);

            isValidated.value = true;
            isCorrect.value = res.correct;
            expectedResult.value = res.expected;
            feedback.value = res.correct ? 'Correct ! Bien joué !' : 'Incorrect. La bonne réponse était : <br/>';
        } else {
            loadingError.value = "Le module WebAssembly n'est pas encore prêt.";
        }
    };

    const nextExercise = () => {
        isValidated.value = false;
        userAnswer.value = '';
        isCorrect.value = false;
        loadExercise();
        nextTick(() => answerInput.value?.focus());
    };

    watch(() => route.params.category, () => {
        loadExercise();
    });

    return {
        categoryId,
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
    };
}
