import withAuth from '../../components/withAuth';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getEmployeeById, updateEmployee, getAllDepartments } from '../../services/employeeService';
import { Box, Button, Card, CardContent, CardMedia, MenuItem, Select, Typography, Table, TableBody, TableCell, TableHead, TableRow, SelectChangeEvent } from '@mui/material';
import { format } from 'date-fns';

const EmployeeDetails: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [employee, setEmployee] = useState<any>(null);
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState<number>(0);
    const [isChanged, setIsChanged] = useState(false);
    const [departmentHistory, setDepartmentHistory] = useState([]);

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                const emp = await getEmployeeById(parseInt(id as string));
                setEmployee(emp.data);
                setDepartmentHistory(emp.data.departmentHistories); // Assuming departmentHistories is part of the response
                const depts = await getAllDepartments();
                setDepartments(depts.data);
                setSelectedDepartment(emp.data.departmentId);
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
            await updateEmployee(employee.employeeId, { ...employee, departmentId: selectedDepartment });
            setIsChanged(false);
        }
    };

    if (!employee) {
        return <div>Loading...</div>;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: 2 }}>
            <Card sx={{ display: 'flex', width: '100%', maxWidth: 600 }}>
                <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image="/path/to/avatar/image"
                    alt="Employee Avatar"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
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
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            Hire Date: {format(new Date(employee.hireDate), 'MMM d, yyyy')}
                        </Typography>
                    </CardContent>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingRight: 2 }}>
                    <Button variant="contained" color={employee.isActive ? 'error' : 'success'}>
                        {employee.isActive ? 'Deactivate' : 'Activate'}
                    </Button>
                </Box>
            </Card>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Select value={selectedDepartment} onChange={handleDepartmentChange}>
                    {departments.map((dept: any) => (
                        <MenuItem key={dept.departmentId} value={dept.departmentId}>
                            {dept.name}
                        </MenuItem>
                    ))}
                </Select>
                <Button variant="contained" color="success" onClick={handleUpdate} disabled={!isChanged}>
                    Update
                </Button>
            </Box>
            <Box sx={{ width: '100%', maxWidth: 600 }}>
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
                        {departmentHistory.map((history: any) => (
                            <TableRow key={history.departmentHistoryId}>
                                <TableCell>{format(new Date(history.startDate), 'MM/dd/yyyy')}</TableCell>
                                <TableCell>{history.department.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Box>
    );
};

export default withAuth(EmployeeDetails);
