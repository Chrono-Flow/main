import { NextResponse } from 'next/server';
import { validateProject, ValidationError } from '@/utils/validation';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import type { NextRequest } from 'next/server'
import { ipAddress } from '@vercel/functions';
import { CreateLog } from '@/app/log';
import { projectType } from '@prisma/client';

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

export async function POST(request: NextRequest) {
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
        const userName = session.user.name as string;
        let t;
        if (type == "SCHEDULE") {
            t = projectType.SCHEDULE
        } else if (type == "BACKEND") {
            t = projectType.BACKEND
        }

        // const project = await prisma.user.update({
        //     where: {
        //         email: userId
        //     },
        //     data: {
        //         projects: {
        //             create: {
        //                 name,
        //                 description,
        //                 image: image || 'https://picsum.photos/300',
        //                 type: t,
        //                 scheduleConfig: scheduleConfig && {
        //                     create: {
        //                         schedule: scheduleConfig?.schedule || '* * * * *',
        //                         timezone: scheduleConfig?.timezone || 'UTC',
        //                         enabled: scheduleConfig?.enabled ?? true
        //                     }
        //                 },
        //                 visibleCode:"",
        //                 serverCode:""
        //             }
        //         },
        //     },
        //     include: {
        //         projects: true,
        //     }
        // });

        const user = await prisma.user.findUnique({
            where: {
                email: userId
            }
        })

        const project = await prisma.project.create({
            data: {
                name,
                description,
                image: image || 'https://picsum.photos/300',
                type: t,
                scheduleConfig: scheduleConfig && {
                    create: {
                        schedule: scheduleConfig?.schedule || '* * * * *',
                        timezone: scheduleConfig?.timezone || 'UTC',
                        enabled: scheduleConfig?.enabled ?? true
                    }
                },
                visibleCode: "",
                serverCode: "",
                // user : user,
                userId: user?.email!,
            }
        })

        CreateLog(`Project ${name} created by ${userName}`, "INFO", userId, request, "CREATE", request.headers.get('user-agent') || "Unknown")
        // await prisma.logs.create({
        //     data: {
        //         userId,
        //         message: `Project ${name} created by ${userName}`,
        //         level: 'INFO'
        //     }
        // });


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