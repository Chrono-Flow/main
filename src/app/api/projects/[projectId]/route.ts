import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export async function DELETE(
    request: Request,
    { params }: { params: { projectId: string } }
) {
    try {
        const session = await getServerSession();

        if (!session?.user?.email) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Delete the project
        await prisma.project.delete({
            where: {
                id: params.projectId,
                user: {
                    email: session.user.email
                }
            }
        });

        return NextResponse.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Failed to delete project:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
} 