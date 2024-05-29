import withAuth from '../components/withAuth';
import React, {useEffect, useState} from 'react';
import {Employee, getAllEmployees} from '../services/employeeService';
import Link from 'next/link';
import {format} from 'date-fns';
import {Avatar, Box, Button, Card, CardContent, Icon, Typography} from '@mui/material';

const Employees: React.FC = () => {
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
            {employees.map((employee) => (
                <Card key={employee.employeeId} sx={{display: 'flex', width: '100%', maxWidth: 600}}>
                    <Avatar sx={{width: 60, height: 60}}>
                        <Icon>{employee.firstName.charAt(0).toUpperCase()}</Icon>
                    </Avatar>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <CardContent sx={{flex: '1 0 auto'}}>
                            <Typography component="div" variant="h5">
                                {employee.firstName} {employee.lastName} ({employee.department.name})
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                Hire Date: {format(new Date(employee.hireDate), 'MMM d, yyyy')}
                            </Typography>
                        </CardContent>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', paddingRight: 2, ml: 'auto'}}>
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
