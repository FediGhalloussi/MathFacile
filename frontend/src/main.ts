import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { useAuthStore } from './stores/auth';

async function initApp() {
    const app = createApp(App);
    const pinia = createPinia();

    app.use(pinia);
    app.use(router);

    const auth = useAuthStore();
    await auth.checkSession();

    app.mount('#app');
}

initApp();
