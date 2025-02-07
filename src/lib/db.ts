import { prisma } from "./prisma"

export async function getUserProjects(userId: string) {
    return await prisma.project.findMany({
        where: { userId },
        orderBy: { updatedAt: 'desc' }
    })
}

export async function createProject(userId: string, data: { name: string; description: string; image?: string }) {
    return await prisma.project.create({
        data: {
            ...data,
            userId,
            description: data.description || '',
            type: "SCHEDULE",
            nodes: [],
            edges: []
        }
    })
}

export async function updateProject(projectId: string, userId: string, data: Partial<{ name: string; description: string; image: string }>) {
    return await prisma.project.update({
        where: {
            id: projectId,
            userId // Ensure user owns the project
        },
        data
    })
} 