// hooks/useAuth.ts
import {useEffect, useState} from 'react';
import {signIn, signOut, useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import axios from 'axios';

const API_URL = 'http://localhost:5146/api/authentication';

export const useAuth = () => {
    const {data: session} = useSession();
    const [user, setUser] = useState(session?.user || null);
    const router = useRouter();

    useEffect(() => {
        if (session?.user) {
            setUser(session.user);
        } else {
            setUser(null);
        }
    }, [session]);

    const login = async (username: string, password: string) => {
        try {
            const result = await signIn('credentials', {
                redirect: false,
                username,
                password
            });

            if (result?.ok) {
                router.push('/employees');
            } else {
                throw new Error('Invalid username or password');
            }
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const register = async (username: string, password: string) => {
        try {
            await axios.post(`${API_URL}/register`, {username, password});
            router.push('/auth/login');
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut({redirect: false});
            setUser(null);
            router.push('/auth/login');
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    };

    const getAuthHeader = () => {
        try {
            const token = session?.user?.token;
            return token ? {Authorization: `Bearer ${token}`} : {};
        } catch (error) {
            console.error('Error getting auth header:', error);
            return {};
        }
    };

    return {user, login, register, logout, getAuthHeader};
};
