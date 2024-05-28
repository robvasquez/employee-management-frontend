import { Button, Typography, Container, Box } from '@mui/material';
import { getCurrentUser, logout } from '../services/authService';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Home() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const currentUser = getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
        }
    }, []);

    const handleLogout = () => {
        logout();
        setUser(null);
        router.push('/auth/login');
    };

    return (
        <Container>

    </Container>
);
}
