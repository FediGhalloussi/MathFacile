import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.CLIENT_URL +'/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
