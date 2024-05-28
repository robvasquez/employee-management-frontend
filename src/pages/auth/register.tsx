import { useState } from 'react';
import { useRouter } from 'next/router';
import { register } from '../../services/authService';
import { Button, TextField, Container, Box, Typography } from '@mui/material';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await register(username, password);
            router.push('/auth/login');
        } catch (error) {
            console.error('Registration failed', error);
            // Handle registration error (e.g., display a message)
        }
    };

    return (
        <Container>
            <Box sx={{ textAlign: 'center', marginTop: 8 }}>
                <Typography variant="h4" gutterBottom>
                    Register
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" type="submit">
                        Register
                    </Button>
                </form>
            </Box>
        </Container>
    );
}
