import {Box, Button, Container, Grid, Typography} from '@mui/material';
import {signOut, useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import React from "react";

export default function Home() {
    const {data: session} = useSession();
    const router = useRouter();

    const handleLogout = async () => {
        await signOut({redirect: false});
        router.push('/auth/login');
    };

    return (
        <Container>
            <Box sx={{textAlign: 'center', marginTop: 8}}>
                <Typography variant="h3" gutterBottom>
                    Welcome to Employee Management System
                </Typography>
                {!session ? (
                    <Box m={2} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <Typography variant="h5" gutterBottom={true}>
                            Please log in to access employee information.
                        </Typography>
                        <Grid container spacing={3} justifyContent="center"> {/* Here is the change */}
                            <Grid item>
                                <Button variant="contained" color="primary" onClick={() => router.push('/auth/login')}>
                                    Login
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary"
                                        onClick={() => router.push('/auth/register')}>
                                    Register
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                ) : (
                    <>
                        <Typography variant="h5" gutterBottom>
                            Welcome, {session.user?.name}!
                        </Typography>
                        <Button variant="contained" color="primary" onClick={handleLogout}>
                            Logout
                        </Button>
                    </>
                )}
            </Box>
        </Container>
    );
}
