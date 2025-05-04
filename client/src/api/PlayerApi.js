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

export const createPlayer = async (playerData) => {
    console.log('CREARE JUCATOR NOU');
    try {
        const res = await api.post('/api/players', playerData);
        return res.data.data || null;
    } catch (err) {
        console.error('Create player error: ', err.response?.data || err.message);
        return {};
    }
}

export const updatePlayer = async (playerId, playerData) => {
    console.log('UPDATING PLAYER...');
    try {
        const res = await api.put(`/api/players/${playerId}`, playerData);
        return res.data.data || null;
    } catch (err) {
        console.error('Update player error: ', err.response?.data || err.message);
        return {};
    }
}

export const deletePlayer = async (playerId) => {
    console.log('DELETING PLAYER...');
    try {
        const res = await api.delete(`/api/players/${playerId}`);
        return res.data.data || null;
    } catch (err) {
        console.error('Deleting player error: ', err.message?.data || err.message);
        return {};
    }
}