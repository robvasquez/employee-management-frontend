import axios from 'axios';
import {decode, JwtPayload} from 'jsonwebtoken';

const API_URL = 'http://localhost:5146/api/authentication';

export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {username, password});
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const register = async (username: string, password: string) => {
    try {
        return await axios.post(`${API_URL}/register`, {username, password});
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const logout = () => {
    try {
        localStorage.removeItem('token');
    } catch (error) {
        console.error(error);
    }
};

export const getCurrentUser = () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) return null;
        return decode(token) as JwtPayload;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getAuthHeader = () => {
    try {
        const token = localStorage.getItem('token');
        return token ? {Authorization: `Bearer ${token}`} : {};
    } catch (error) {
        console.error(error);
        return {};
    }
};