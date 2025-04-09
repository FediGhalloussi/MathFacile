import Module from '@/wasm/math.wasm.js';

let wasmInstance: any = null;

export async function loadWasmModule(): Promise<any> {
    if (wasmInstance) return wasmInstance;

    return new Promise((resolve, reject) => {
        Module().then(async (instance: any) => {
            wasmInstance = instance;
            await initExerciseModule(wasmInstance); // ← on injecte les catégories ici
            resolve(wasmInstance);
        }).catch(reject);
    });
}

async function initExerciseModule(wasmModule: any): Promise<void> {
    try {
        const res = await fetch('/src/assets/categories.json');
        const jsonText = await res.text();

        const ptr = Module.allocateUTF8(jsonText);
        wasmModule._loadCategoriesFromJson(ptr);
        wasmModule._free(ptr);

        console.log('[Frontend] JSON des catégories injecté au module WebAssembly ✅');
    } catch (err) {
        console.error('[Frontend] Échec du chargement du JSON des catégories :', err);
    }
}


// Fonction pour générer un exercice
export const generateExercise = (wasmModule: any, exerciseName: string): string => {
    const generate = wasmModule.cwrap('generateExercise', 'string', ['string']);
    return generate(exerciseName);
};

// Fonction pour vérifier la réponse
export const verifyAnswer = (wasmModule: any, exerciseName: string, question: string, answer: string): string => {
    const verify = wasmModule.cwrap('verifyAnswer', 'string', ['string', 'string', 'string']);
    return verify(exerciseName, question, answer);
};
