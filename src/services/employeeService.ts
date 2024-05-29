import axios from 'axios';
import {getSession} from 'next-auth/react';

const API_URL = 'http://localhost:5146/api';

const getAuthHeader = async () => {
    try {
        const session = await getSession();
        if (session?.user?.token) {
            console.log('Token:', session.user.token); // Debugging log
            return {Authorization: `Bearer ${session.user.token}`};
        }
        console.log('No token found'); // Debugging log
        return {};
    } catch (error) {
        console.error('Error getting auth header:', error);
        return {};
    }
};

export interface Department {
    departmentId: number;
    name: string;
    employees?: Employee[];
}

export interface DepartmentHistory {
    departmentHistoryId: number;
    employeeId: number;
    departmentId: number;
    startDate: string;
    department?: Department;
}

export interface Employee {
    employeeId: number;
    firstName: string;
    lastName: string;
    hireDate: string;
    phone: string;
    address: string;
    isActive: boolean;
    departmentId: number;
    department: Department;
    departmentHistories?: DepartmentHistory[];
}

export const getAllEmployees = async (): Promise<Employee[]> => {
    try {
        const headers = await getAuthHeader();
        const response = await axios.get(`${API_URL}/Employee`, {headers});
        return response.data;
    } catch (error) {
        console.error('Error getting all employees:', error);
        return [];
    }
};

export const getEmployeeById = async (id: number): Promise<Employee | null> => {
    try {
        const headers = await getAuthHeader();
        const response = await axios.get(`${API_URL}/Employee/${id}`, {headers});
        return response.data;
    } catch (error) {
        console.error(`Error getting employee with id ${id}:`, error);
        return null;
    }
};

export const addEmployee = async (employee: Omit<Employee, 'employeeId'>): Promise<Employee | null> => {
    try {
        const headers = await getAuthHeader();
        const response = await axios.post(`${API_URL}/Employee`, employee, {headers});
        return response.data;
    } catch (error) {
        console.error('Error adding an employee:', error);
        return null;
    }
};

export const updateEmployee = async (id: number, employee: Omit<Employee, 'employeeId'>): Promise<Employee | null> => {
    try {
        const headers = await getAuthHeader();
        const payload = {
            ...employee,
            employeeId: id
        };
        const response = await axios.put(`${API_URL}/Employee/${id}`, payload, {headers});
        return response.data;
    } catch (error) {
        console.error(`Error updating employee with id ${id}:`, error);
        return null;
    }
};

export const deleteEmployee = async (id: number): Promise<void> => {
    try {
        const headers = await getAuthHeader();
        await axios.delete(`${API_URL}/Employee/${id}`, {headers});
    } catch (error) {
        console.error(`Error deleting employee with id ${id}:`, error);
    }
};

export const getAllDepartments = async (): Promise<Department[]> => {
    try {
        const headers = await getAuthHeader();
        const response = await axios.get(`${API_URL}/Department`, {headers});
        console.log('Departments fetched:', response.data); // Debugging log
        return response.data;
    } catch (error) {
        console.error('Error getting all departments:', error);
        return [];
    }
};

export const assignDepartment = async (employeeId: number, newDepartmentId: number): Promise<Employee | null> => {
    try {
        const headers = await getAuthHeader();
        const payload = {
            employeeId,
            newDepartmentId
        };
        const response = await axios.post(`${API_URL}/Employee/assign-department`, payload, {headers});
        return response.data;
    } catch (error) {
        console.error(`Error assigning department for employee with id ${employeeId}:`, error);
        return null;
    }
};
