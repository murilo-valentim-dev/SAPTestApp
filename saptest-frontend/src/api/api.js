import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:5219/api',
    headers: {
        'Content-Type': 'application/json',
    },
});
