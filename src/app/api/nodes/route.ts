import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request) {
    try {
        const session = await getServerSession();
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { projectId, nodes } = await request.json();

        if (!projectId) {
            return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
        }

        const updatedProject = await prisma.user.update({
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
                            nodes: nodes,
                        }
                    }
                }
            },
            include: {
                projects: true
            }
        });

        const project = await prisma.project.update({
            where: {
                id: projectId
            },
            data: {
                nodes: nodes
            }
        })

        return NextResponse.json({ nodes: updatedProject.projects[0].nodes });
    } catch (error) {
        console.error('Error updating nodes:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const session = await getServerSession();
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const projectId = searchParams.get('projectId');

        if (!projectId) {
            return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
        }

        const project = await prisma.project.findUnique({
            where: {
                id: projectId,
                userId: session.user.email
            }
        });

        return NextResponse.json({ nodes: project?.nodes || [] });
    } catch (error) {
        console.error('Error fetching nodes:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
} 