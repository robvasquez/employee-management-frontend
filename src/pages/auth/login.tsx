import {useState} from 'react';
import {signIn} from 'next-auth/react';
import {useRouter} from 'next/router';
import {Box, Button, Container, TextField, Typography} from '@mui/material';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const result = await signIn('credentials', {
                username,
                password
            });

            if (result?.ok) {
                router.push('/employees');
            } else {
                console.error('Login failed');
                setError('Invalid username or password');
            }
        } catch (e) {
            console.log(e)
        }


    };

    return (
        <Container>
            <Box sx={{textAlign: 'center', marginTop: 8}}>
                <Typography variant="h4" gutterBottom>
                    Login
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
                        Login
                    </Button>
                </form>
            </Box>
        </Container>
    );
}
