"use client"

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { LoadingProvider } from '@/context/LoadingContext';
import Loader from '@/lib/spinner';
export default function DashboardLayout({ children }) {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <div>
            <Loader />
        </div>;
    }

    if (!session) {
        redirect('/login');
    }

    return (
        <LoadingProvider>
            <div>
                <title>Dashboard</title>
                {children}
            </div>
        </LoadingProvider>
    );
}
