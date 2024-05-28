import { useRouter } from 'next/router';
import React, { useEffect, ComponentType } from 'react';
import { useSession } from 'next-auth/react';

function withAuth<T extends React.JSX.IntrinsicAttributes>(WrappedComponent: ComponentType<T>) {
    const ComponentWithAuth = (props: T) => {
        const { data: session, status } = useSession();
        const router = useRouter();

        useEffect(() => {
            if (status === 'loading') return;
            if (!session) {
                router.push('/auth/login');
            }
        }, [session, status, router]);

        if (status === 'loading' || !session) {
            return <div>Loading...</div>;
        }

        return <WrappedComponent {...props} />;
    };

    return ComponentWithAuth;
}

export default withAuth;
