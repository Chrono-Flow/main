import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
    try {
        const session = await getServerSession()
        const { projectId } = await params
        if (!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const project = await prisma.project.findUnique({
            where: {
                id: await projectId,
                // userId: session.user.id
            }
        })
        console.log({ project })
        if (!project) {
            return new NextResponse('Project not found', { status: 404 })
        }

        return NextResponse.json(project)

    } catch (error) {
        console.error('Error fetching project:', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}

export async function PATCH(request, { params }) {
    try {
        const session = await getServerSession()

        if (!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const body = await request.json()
        const { name, description, image } = body

        const project = await prisma.project.update({
            where: {
                id: params.projectId,
                userId: session.user.id
            },
            data: {
                name,
                description,
                image
            }
        })

        return NextResponse.json(project)

    } catch (error) {
        console.error('Error updating project:', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}

export async function DELETE(request, { params }) {
    try {
        const session = await getServerSession()

        if (!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        await prisma.project.delete({
            where: {
                id: params.projectId,
                userId: session.user.id
            }
        })

        return new NextResponse('Project deleted', { status: 200 })

    } catch (error) {
        console.error('Error deleting project:', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
} 