'use client';

import { SessionProvider } from 'next-auth/react';
import './globals.css';
import { ToastProvider } from '@/components/ui/Toast/ToastContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>Chrono-Flow</title>
      <body>
        <SessionProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
