import { defineStore } from 'pinia';

export const useFlashStore = defineStore('flash', {
    state: () => ({
        message: '' as string,
    }),
    actions: {
        setMessage(msg: string) {
            this.message = msg;
            setTimeout(() => this.message = '', 5000);
        }
    }
});
