import {SessionProvider} from 'next-auth/react';
import {AppProps} from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import ErrorBoundary from '@/components/ErrorBoundary';
import Header from '@/components/Header';

export default function MyApp({Component, pageProps: {session, ...pageProps}}: AppProps) {
    return (
        <SessionProvider session={session}>
            <CssBaseline/>
            <ErrorBoundary>
                <Header/>
                <Component {...pageProps} />
            </ErrorBoundary>
        </SessionProvider>
    );
}
