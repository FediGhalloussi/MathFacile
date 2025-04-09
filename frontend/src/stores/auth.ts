import { defineStore } from 'pinia';
import api from '@/api/api';

interface User {
    name: string;
    email: string;
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as User | null,
        isAuthenticated: false,
    }),

    actions: {
        authenticate(user: User) {
            this.user = user;
            this.isAuthenticated = true;
        },

        async logout() {
            try {
                await api.post('/auth/logout', {});
            } catch (err) {
                console.warn('Erreur lors de la déconnexion', err);
            } finally {
                this.user = null;
                this.isAuthenticated = false;
            }
        },

        async login(email: string, password: string, rememberMe: boolean) {
            try {
                const res = await api.post('/auth/login', { email, password, rememberMe });
                this.authenticate(res.data.user);
                return { success: true };
            } catch (err) {
                return { success: false, message: 'Email ou mot de passe incorrect.' };
            }
        },

        async register(name: string, email: string, password: string) {
            try {
                const res = await api.post('/auth/register', { name, email, password });
                this.authenticate(res.data.user);
                return { success: true };
            } catch (err) {
                return { success: false, message: 'Erreur lors de l’inscription.' };
            }
        },

        async checkSession() {
            try {
                const res = await api.get('/auth/me');
                this.authenticate(res.data.user);
            } catch {
                this.logout();
            }
        }
    }
});
