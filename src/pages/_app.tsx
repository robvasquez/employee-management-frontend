import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <SessionProvider session={session}>
                <CssBaseline />
                <Component {...pageProps} />
        </SessionProvider>
    );
}
