import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            token: string;
            name: string;
        } & DefaultSession['user'];
    }

    interface User {
        id: string;
        token: string;
        name: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string;
        token: string;
        name: string;
    }
}
