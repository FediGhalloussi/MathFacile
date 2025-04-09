import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useFlashStore } from '@/stores/flash';

import HomePage from "@/pages/HomePage.vue";
import ExercisePage from "@/pages/ExercisePage.vue";
import TermsPage from '@/pages/TermsPage.vue';
import Auth from '@/components/auth/Auth.vue';
import Register from '@/components/auth/Register.vue';
import ComingSoonPage from '@/pages/ComingSoon.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';

const routes = [
    { path: '/', name: 'Home', component: HomePage, meta: { title: 'Accueil', requiresAuth: false } },
    { path: '/exercice', name: 'Exercise', component: ExercisePage, meta: { title: 'Exercice', requiresAuth: false } },
    { path: '/exercice/:category', name: 'ExerciseCategory', component: ExercisePage, props: true, meta: { title: 'Exercice', requiresAuth: false } },
    { path: '/proposer-exercice', name: 'Proposer', component: ComingSoonPage, meta: { title: 'Proposer un exercice', requiresAuth: true } },
    { path: '/contact', name: 'Proposer', component: ComingSoonPage, meta: { title: 'Nous contacter', requiresAuth: false } },
    { path: '/login', name: 'Login', component: Auth, meta: { title: 'Connexion', requiresAuth: false } },
    { path: '/register', name: 'Register', component: Register, meta: { title: 'Inscription', requiresAuth: false } },
    { path: '/terms', name: 'Terms', component: TermsPage, meta: { title: 'Conditions d\'utilisation', requiresAuth: false } },
    { path: '/forgot-password', name: 'ForgotPassword', component: ComingSoonPage, meta: { title: 'Mot de passe oublié', requiresAuth: false } },
    { path: '/:catchAll(.*)', name: 'NotFound', component: NotFoundPage, meta: { title: 'Page non trouvée', requiresAuth: false } },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

declare module 'vue-router' {
    interface RouteMeta {
        title?: string;
        requiresAuth?: boolean;
    }
}

// 🌐 Global route guard
router.beforeEach(async (to, _from, next) => {
    document.title = to.meta.title || 'Math Facile';
    const authStore = useAuthStore();

    if (to.meta.requiresAuth) {
        if (authStore.isAuthenticated) {
            return next();
        }

        await authStore.checkSession();

        if (authStore.isAuthenticated) {
            return next();
        } else {
            useFlashStore().setMessage("Vous devez être connecté pour accéder à cette page.");
            return next('/login');
        }
    }

    return next();
});

export default router;
