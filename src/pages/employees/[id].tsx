import withAuth from '../../components/withAuth';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {
    assignDepartment,
    Department,
    DepartmentHistory,
    Employee,
    getAllDepartments,
    getEmployeeById,
    updateEmployee
} from '../../services/employeeService';
import {
    Avatar,
    Box,
    Button,
    Card,
    Icon,
    MenuItem,
    Select,
    SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import {differenceInDays, differenceInMonths, differenceInYears, format} from 'date-fns';

const EmployeeDetails: React.FC = () => {
    const router = useRouter();
    const {id} = router.query;
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [selectedDepartment, setSelectedDepartment] = useState<number>(0);
    const [isChanged, setIsChanged] = useState(false);
    const [departmentHistory, setDepartmentHistory] = useState<DepartmentHistory[]>([]);

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                const emp = await getEmployeeById(parseInt(id as string));
                setEmployee(emp);
                setDepartmentHistory(emp?.departmentHistories?.length ? emp?.departmentHistories : []);
                const depts = await getAllDepartments();
                console.log('Fetched departments:', depts); // Debugging log
                setDepartments(depts);
                setSelectedDepartment(emp?.departmentId ?? 0);
            };
            fetchData();
        }
    }, [id]);

    const handleDepartmentChange = (event: SelectChangeEvent<number>) => {
        setSelectedDepartment(parseInt(event.target.value as string, 10));
        setIsChanged(true);
    };

    const handleUpdate = async () => {
        if (employee && selectedDepartment !== null) {
            // Check if the department has changed
            if (employee.departmentId !== selectedDepartment) {
                const result = await assignDepartment(employee.employeeId, selectedDepartment);

                if (result) {
                    setEmployee(result);
                    setDepartmentHistory(result.departmentHistories); // Update the department history state
                    setIsChanged(false);
                } else {
                    console.error(`Failed to assign new department to the employee with ID: ${employee.employeeId}`);
                }
            }
        }
    };

    const handleClick = async () => {
        if (!employee) {
            return;
        }

        employee.isActive = !employee.isActive;
        const updatedEmployee = await updateEmployee(employee.employeeId, employee);

        if (!updatedEmployee) {
            console.error(`Failed to update the employee with ID: ${employee.employeeId}`);
            return;
        }

        // Update the state with the new employee data
        setEmployee(updatedEmployee);

        if (updatedEmployee.isActive) {
            console.log(`Employee with ID: ${employee.employeeId} is now active`);
        } else {
            console.log(`Employee with ID: ${employee.employeeId} is now not active`);
        }
    };

    if (!employee) {
        return <div>Loading...</div>;
    }

    const hireDate = new Date(employee.hireDate);
    const currentDate = new Date();
    const years = differenceInYears(currentDate, hireDate);
    const months = differenceInMonths(currentDate, hireDate) % 12;
    const days = differenceInDays(currentDate, hireDate) % 30;

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: 2}}>
            <Card sx={{display: 'flex', width: '100%', maxWidth: 1000, padding: 2}}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 2
                }}>
                    <Avatar sx={{width: 150, height: 150, bgcolor: employee.isActive ? 'success.main' : 'error.main'}}>
                        <Icon sx={{fontSize: 60}}>{employee.firstName.charAt(0).toUpperCase()}</Icon>
                    </Avatar>
                    <Typography color={employee.isActive ? 'success' : 'error'}>
                        {employee.isActive ? 'Active' : 'Inactive'}
                    </Typography>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', flex: 1, padding: 2}}>
                    <Typography component="div" variant="h5">
                        {employee.firstName} {employee.lastName}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Employee ID: {employee.employeeId}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Department: {employee.department.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Telephone: {employee.phone}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Address: {employee.address}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div" sx={{marginTop: 2}}>
                        Update Department
                    </Typography>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        <Select value={selectedDepartment} onChange={handleDepartmentChange} displayEmpty>
                            {departments.map((dept) => (
                                <MenuItem key={dept.departmentId} value={dept.departmentId}>
                                    {dept.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <Button variant="contained" color="success" onClick={handleUpdate} disabled={!isChanged}>
                            Update
                        </Button>
                    </Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    padding: 2
                }}>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Hire Date: {format(hireDate, 'MMM d, yyyy')}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {years}y - {months}m - {days}d
                    </Typography>
                    <Button
                        variant="contained"
                        color={employee.isActive ? "error" : "success"}
                        sx={{marginTop: 2}}
                        onClick={handleClick}
                    >
                        {employee.isActive ? "Deactivate" : "Activate"}
                    </Button>
                </Box>
            </Card>
            <Box sx={{width: '100%', maxWidth: 1000, marginTop: 2}}>
                <Typography variant="h6" gutterBottom>
                    Department History
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Department</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {departmentHistory && departmentHistory.length && departmentHistory.map((history) => (
                            <TableRow key={history.departmentHistoryId}>
                                <TableCell>{format(new Date(history.startDate), 'MM/dd/yyyy')}</TableCell>
                                <TableCell>{history.department?.name ?? 'N/A'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Box>
    );
};

export default withAuth(EmployeeDetails);
