import axios from 'axios';
import {getSession} from 'next-auth/react';

const API_URL = 'http://localhost:5146/api';

const getAuthHeader = async () => {
    const session = await getSession();
    if (session?.user?.token) {
        console.log('Token:', session.user.token);
        return {Authorization: `Bearer ${session.user.token}`};
    }
    console.log('No token found'); // Add logging
    return {};
};

export const getAllEmployees = async () => {
    const headers = await getAuthHeader();
    console.log('Headers:', headers);
    return await axios.get(`${API_URL}/Employee`, {headers});
};

export const getEmployeeById = async (id: number) => {
    const headers = await getAuthHeader();
    return await axios.get(`${API_URL}/Employee/${id}`, {headers});
};

export const addEmployee = async (employee: any) => {
    const headers = await getAuthHeader();
    return await axios.post(`${API_URL}/Employee`, employee, {headers});
};

export const updateEmployee = async (id: number, employee: any) => {
    const headers = await getAuthHeader();
    return await axios.put(`${API_URL}/Employee/${id}`, employee, {headers});
};

export const deleteEmployee = async (id: number) => {
    const headers = await getAuthHeader();
    return await axios.delete(`${API_URL}/Employee/${id}`, {headers});
};

export const getAllDepartments = async () => {
    const headers = await getAuthHeader();
    return await axios.get(`${API_URL}/Department`, {headers});
};
