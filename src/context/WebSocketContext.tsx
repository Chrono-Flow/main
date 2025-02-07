'use client';

import { createContext, useContext, useEffect, useRef, ReactNode } from 'react';

interface WebSocketContextType {
    sendNodeUpdate: (nodes: any[]) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export function WebSocketProvider({
    children,
    projectId
}: {
    children: ReactNode;
    projectId: string;
}) {
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:${process.env.NEXT_PUBLIC_WS_PORT || 3001}?projectId=${projectId}`);
        wsRef.current = ws;

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'node_update') {
                // Handle node updates from other clients
                // You can use a callback or state management here
            }
        };

        return () => {
            ws.close();
        };
    }, [projectId]);

    const sendNodeUpdate = (nodes: any[]) => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({
                type: 'node_update',
                nodes
            }));
        }
    };

    return (
        <WebSocketContext.Provider value={{ sendNodeUpdate }}>
            {children}
        </WebSocketContext.Provider>
    );
}

export function useWebSocket() {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
} 