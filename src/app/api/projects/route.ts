import { NextResponse } from 'next/server';
import { validateProject, ValidationError } from '@/utils/validation';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

const initialReadmeNode = {
    id: 'readme',
    type: 'readmeNode',
    data: {
        label: 'Getting Started',
        content: 'TIP: Press Ctrl+P to add more components here\nUpdate or add more components to build your workflow.'
    },
    position: { x: 250, y: 50 },
};

const initialScheduleNode = {
    id: 'schedule-1',
    type: 'scheduleNode',
    data: {
        label: 'Schedule Task',
        schedule: '* * * * *'
    },
    position: { x: 250, y: 150 },
};

export async function POST(request: Request) {
    try {
        const session = await getServerSession();

        if (!session?.user?.email) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const d = await request.json();
        const { name, description, image, type, scheduleConfig } = validateProject(d);
        const userId = session.user.email as string;

        const project = await prisma.user.update({
            where: {
                email: userId
            },
            data: {
                projects: {
                    create: {
                        name,
                        description,
                        image,
                        type: "SCHEDULE",
                        scheduleConfig: {
                            create: {
                                schedule: scheduleConfig?.schedule || '* * * * *',
                                timezone: scheduleConfig?.timezone || 'UTC',
                                enabled: scheduleConfig?.enabled ?? true
                            }
                        }
                    }
                }
            },
            include: {
                projects: true,
            }
        });

        return NextResponse.json(project, { status: 201 });
    } catch (error) {
        console.log({ error });
        if (error instanceof ValidationError) {
            return NextResponse.json(
                { message: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const session = await getServerSession();

        if (!session?.user?.email) {
            return NextResponse.json(
                { message: 'Unauthorize`d`' },
                { status: 401 }
            );
        }

        const projects = await prisma.user.findUnique({
            where: {
                email: session.user.email,
            },
            include: {
                projects: true
            }
        });

        return NextResponse.json(projects?.projects);
    } catch (error) {
        console.error('Failed to fetch projects:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}