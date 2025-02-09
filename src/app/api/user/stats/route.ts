import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const session = await getServerSession();
        if (!session?.user?.email) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const stats = await prisma.user.findUnique({
            where: {
                email: session.user.email
            },
            select: {
                _count: {
                    select: {
                        projects: true,
                        logs: true
                    }
                },
                projects: {
                    select: {
                        status: true,
                        flowCount: true,
                        type: true,
                        createdAt: true
                    }
                }
            }
        });

        return NextResponse.json(stats);
    } catch (error) {
        console.error('Error fetching user stats:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
} 