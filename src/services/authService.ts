import axios from 'axios';
import { JwtPayload, decode } from 'jsonwebtoken';

const API_URL = 'http://localhost:5146/api/authentication';

export const login = async (username: string, password: string) => {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

export const register = async (username: string, password: string) => {
    return await axios.post(`${API_URL}/register`, { username, password });
};

export const logout = () => {
    localStorage.removeItem('token');
};

export const getCurrentUser = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    return decode(token) as JwtPayload;
};

export const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};
