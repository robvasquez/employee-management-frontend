import withAuth from '../components/withAuth';
import React, { useEffect, useState } from 'react';
import { getAllEmployees } from '../services/employeeService';
import Link from 'next/link';
import {format} from 'date-fns/format';
import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';

const Employees: React.FC = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllEmployees();
            setEmployees(result.data);
        };
        fetchData();
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: 2 }}>
            {employees.map((employee: any) => (
                <Card key={employee.employeeId} sx={{ display: 'flex', width: '100%', maxWidth: 600 }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 151 }}
                        image="/path/to/avatar/image"
                        alt="Employee Avatar"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                {employee.firstName} {employee.lastName} ({employee.department.name})
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                Hire Date: {format(new Date(employee.hireDate), 'MMM d, yyyy')}
                            </Typography>
                        </CardContent>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', paddingRight: 2 }}>
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
