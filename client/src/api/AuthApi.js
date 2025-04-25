import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export const login = async (formData) => {
    try {
        const res = await api.post('/auth/login', {
            email: formData.email, 
            password: formData.password
        });
        
        console.log('Login response:', res.data);
        return res.data.user || null;
    } catch (err) {
        console.error('Login error:', err.response?.data || err.message);
    }
};


