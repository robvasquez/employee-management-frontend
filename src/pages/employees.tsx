import React, {useEffect, useState} from 'react';
import {format} from 'date-fns';
import Link from 'next/link';
import {Avatar, Box, Button, Card, CardContent, Icon, Typography} from '@mui/material';
import {Employee, useEmployeeService} from '../hooks/useEmployeeService';
import withAuth from '../components/withAuth';

const Employees: React.FC = () => {
    const {getAllEmployees} = useEmployeeService();
    const [employees, setEmployees] = useState<Employee[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllEmployees();
            setEmployees(result);
        };
        fetchData();
    }, []);

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: 2}}>
            {employees &&
                employees.length &&
                employees.map((employee) => (
                    <Card key={employee.employeeId}
                          sx={{display: 'flex', width: '100%', maxWidth: 600, flexDirection: 'row'}}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                flexBasis: '20%',
                                padding: 2,
                                alignItems: 'center'
                            }}
                        >
                            <Avatar sx={{
                                width: 60,
                                height: 60,
                                bgcolor: employee.isActive ? 'success.main' : 'error.main'
                            }}>
                                <Icon>{employee.firstName.charAt(0).toUpperCase()}</Icon>
                            </Avatar>
                            <Typography variant="subtitle1" color={employee.isActive ? 'success.main' : 'error.main'}
                                        component="div">
                                {employee.isActive ? 'Active' : 'Inactive'}
                            </Typography>
                        </Box>

                        <Box sx={{display: 'flex', flexDirection: 'column', flexBasis: '60%', padding: 2}}>
                            <CardContent>
                                <Typography component="div" variant="h5">
                                    {employee.firstName} {employee.lastName} ({employee.department.name})
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Hire Date: {format(new Date(employee.hireDate), 'MMM d, yyyy')}
                                </Typography>
                            </CardContent>
                        </Box>

                        <Box
                            sx={{display: 'flex', alignItems: 'center', paddingRight: 2, ml: 'auto', flexBasis: '20%'}}>
                            <Link href={`/employees/${employee.employeeId}`} passHref>
                                <Button variant="contained" color="success">
                                    View Details
                                </Button>
                            </Link>
                        </Box>
                    </Card>
                ))}
        </Box>
    );
};

export default withAuth(Employees);
