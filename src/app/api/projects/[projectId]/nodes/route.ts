import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

// Add rate limiting for the same user+project combination
const updateCache = new Map<string, number>();
const THROTTLE_TIME = 2000; // 2 seconds

export async function PUT(request: Request) {
    try {
        const session = await getServerSession();
        if (!session?.user?.email) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const projectId = request.url.split('/projects/')[1].split('/')[0];
        const cacheKey = `${session.user.email}-${projectId}`;

        // Check if we should throttle this request
        const lastUpdate = updateCache.get(cacheKey);
        const now = Date.now();

        if (lastUpdate && (now - lastUpdate) < THROTTLE_TIME) {
            return NextResponse.json(
                { message: 'Too many requests, please wait' },
                { status: 429 }
            );
        }

        const { nodes } = await request.json();
        updateCache.set(cacheKey, now);

        // Update the user's project with the new nodes
        // not updating the project directly, because there's some node bug that is causing issue and not letting it update
        // specifiically it is "payload argument must be object but null found"
        // so we're updating the user and then getting the project from the user
        const user = await prisma.user.update({
            where: {
                email: session.user.email
            },
            data: {
                projects: {
                    update: {
                        where: {
                            id: projectId
                        },
                        data: {
                            nodes: nodes
                        }
                    }
                }
            },
            include: {
                projects: {
                    where: {
                        id: projectId
                    }
                }
            }
        });

        const project = user.projects[0];

        return NextResponse.json(project);
    } catch (error) {
        console.error('Error updating nodes:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
} 