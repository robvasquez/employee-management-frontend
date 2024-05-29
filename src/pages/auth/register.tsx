// pages/auth/register.tsx
import {useState} from 'react';
import {Box, Button, Container, TextField, Typography} from '@mui/material';
import {useAuth} from '../../hooks/useAuth';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {register} = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await register(username, password);
        } catch (error) {
            setError('Registration failed');
        }
    };

    return (
        <Container>
            <Box sx={{textAlign: 'center', marginTop: 8}}>
                <Typography variant="h4" gutterBottom>
                    Register
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
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
