import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {label: 'Username', type: 'text'},
                password: {label: 'Password', type: 'password'}
            },
            async authorize(credentials) {
                console.log('authorize called with credentials:', credentials);
                try {
                    const response = await axios.post('http://localhost:5146/api/Authentication/login', {
                        username: credentials?.username,
                        password: credentials?.password
                    });

                    console.log('API response:', response.data);

                    if (response.data.token) {
                        return {
                            id: response.data.userId,
                            name: response.data.username,
                            token: response.data.token
                        };
                    } else {
                        console.log('No data in API response');
                        return null;
                    }
                } catch (error) {
                    console.error('Login error:', error);
                    return null;
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async session({session, token}) {
            console.log('session callback called with token:', token);
            session.user = {
                id: token.id,
                name: token.name,
                token: token.token
            };
            return session;
        },
        async jwt({token, user}) {
            console.log('jwt callback called with user:', user);
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.token = user.token;
            }
            return token;
        }
    }
});
