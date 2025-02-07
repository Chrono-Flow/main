import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

const wss = new WebSocketServer({ noServer: true });

// Track connections by project
const projectConnections = new Map<string, Set<WebSocket>>();

wss.on('connection', (ws: any, projectId: string, userId: string) => {
    // Add to project connections
    if (!projectConnections.has(projectId)) {
        projectConnections.set(projectId, new Set());
    }
    projectConnections.get(projectId)?.add(ws);

    ws.on('message', async (message: any) => {
        try {
            const data = JSON.parse(message.toString());

            if (data.type === 'node_update') {
                // Update nodes in database
                await prisma.project.update({
                    where: {
                        id: projectId,
                        userId: userId
                    },
                    data: {
                        nodes: data.nodes
                    }
                });

                // Broadcast to all clients except sender
                projectConnections.get(projectId)?.forEach(client => {
                    if (client !== ws && client.readyState === ws.OPEN) {
                        client.send(JSON.stringify({
                            type: 'node_update',
                            nodes: data.nodes
                        }));
                    }
                });
            }
        } catch (error) {
            console.error('WebSocket error:', error);
        }
    });

    ws.on('close', () => {
        projectConnections.get(projectId)?.delete(ws);
    });
});

const server = createServer();

server.on('upgrade', async (request, socket, head) => {
    try {
        const session = await getServerSession();
        if (!session?.user?.email) {
            socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
            socket.destroy();
            return;
        }

        const projectId = new URL(request.url!, `http://${request.headers.host}`).searchParams.get('projectId');
        if (!projectId) {
            socket.write('HTTP/1.1 400 Bad Request\r\n\r\n');
            socket.destroy();
            return;
        }

        wss.handleUpgrade(request, socket, head, (ws: any) => {
            wss.emit('connection', ws, projectId, session.user?.email!);
        });
    } catch (error) {
        console.error('WebSocket upgrade error:', error);
        socket.destroy();
    }
});

server.listen(process.env.WS_PORT || 3001, () => {
    console.log(`WebSocket server is running on port ${process.env.WS_PORT || 3001}`);
});

export const GET = async () => {
    return NextResponse.json({ status: 'WebSocket server running' });
}; 