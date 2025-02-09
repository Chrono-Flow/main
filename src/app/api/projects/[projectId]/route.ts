import { CreateLog } from '@/app/log'
import { prisma } from '@/lib/prisma'
import { ipAddress } from '@vercel/functions'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession()
        if (!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        // Get projectId from URL
        const projectId = request.nextUrl.pathname.split('/projects/')[1]

        const project = await prisma.project.findUnique({
            where: {
                id: projectId,
                userId: session.user.email!
            }
        })

        if (!project) {
            return new NextResponse('Project not found', { status: 404 })
        }

        return NextResponse.json(project)

    } catch (error) {
        console.error('Error fetching project:', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const session = await getServerSession()

        if (!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 })
        }
        const projectId = request.nextUrl.pathname.split('/projects/')[1]
        const body = await request.json()
        const { name, description, image } = body

        const project = await prisma.project.update({
            where: {
                id: projectId,
                userId: session.user.email!
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

export async function DELETE(request: NextRequest) {
    try {
        const session = await getServerSession()
        if (!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const projectId = request.nextUrl.pathname.split('/projects/')[1]

        await prisma.user.update({
            where: {
                email: session.user.email!
            },
            data: {
                projects: {
                    delete: {
                        id: projectId
                    }
                }
            }
        })

        CreateLog(`Project ${projectId} deleted by ${session.user.email}`, "WARN", session.user.email!, request, "DELETE", request.headers.get('user-agent') || "Unknown")
        return new NextResponse('Project deleted', { status: 200 })

    } catch (error) {
        console.error('Error deleting project:', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
} 