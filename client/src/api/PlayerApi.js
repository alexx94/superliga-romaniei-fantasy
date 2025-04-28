import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export const getPlayers = async (params = {}) => {
    console.log('BASE_URL:', BASE_URL);

    try {
    
        const res = await api.get('/api/players', { params });
        return res.data.data || [];      
    } catch (err) {
        console.error('Get players error: ', err.response?.data || err.message);
        return [];
    }
}

export const createPlayer = async (params = {}) => {
    console.log('CREARE JUCATOR NOU');

    // TODO - POST
}

export const updatePlayer = async (params = {}) => {
    console.log('UPDATING JUCATOR...');

    // TODO - Select id, update
}

export const deletePlayer = async (params = {}) => {
    console.log('BASE_URL:', BASE_URL);

    // TODO - Select id, delete
}