import axios from 'axios';
import {useAuth} from './useAuth';

const API_URL = 'http://localhost:5146/api';

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

export const useEmployeeService = () => {
    const {getAuthHeader} = useAuth();

    const getAllEmployees = async (): Promise<Employee[]> => {
        try {
            const headers = getAuthHeader();
            const response = await axios.get(`${API_URL}/Employee`, {headers});
            return response.data;
        } catch (error) {
            console.error('Error getting all employees:', error);
            return [];
        }
    };

    const getEmployeeById = async (id: number): Promise<Employee | null> => {
        try {
            const headers = getAuthHeader();
            const response = await axios.get(`${API_URL}/Employee/${id}`, {headers});
            return response.data;
        } catch (error) {
            console.error(`Error getting employee with id ${id}:`, error);
            return null;
        }
    };

    const addEmployee = async (employee: Omit<Employee, 'employeeId'>): Promise<Employee | null> => {
        try {
            const headers = getAuthHeader();
            const response = await axios.post(`${API_URL}/Employee`, employee, {headers});
            return response.data;
        } catch (error) {
            console.error('Error adding an employee:', error);
            return null;
        }
    };

    const updateEmployee = async (id: number, employee: Omit<Employee, 'employeeId'>): Promise<Employee | null> => {
        try {
            const headers = getAuthHeader();
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

    const deleteEmployee = async (id: number): Promise<void> => {
        try {
            const headers = getAuthHeader();
            await axios.delete(`${API_URL}/Employee/${id}`, {headers});
        } catch (error) {
            console.error(`Error deleting employee with id ${id}:`, error);
        }
    };

    const getAllDepartments = async (): Promise<Department[]> => {
        try {
            const headers = getAuthHeader();
            const response = await axios.get(`${API_URL}/Department`, {headers});
            console.log('Departments fetched:', response.data); // Debugging log
            return response.data;
        } catch (error) {
            console.error('Error getting all departments:', error);
            return [];
        }
    };

    const assignDepartment = async (employeeId: number, newDepartmentId: number): Promise<Employee | null> => {
        try {
            const headers = getAuthHeader();
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

    return {
        getAllEmployees,
        getEmployeeById,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        getAllDepartments,
        assignDepartment
    };
};
