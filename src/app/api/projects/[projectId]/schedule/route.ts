import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
    const projectId = request.nextUrl.pathname.split('/')[3];
    const schedule  = await request.json();
    console.log({schedule})
    const session = await getServerSession();

    if (!projectId) {
        return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
        where:{
            email:session?.user?.email!
        }
    })

    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
            userId: user?.id
        }
    })
    console.log({project})  

    if (!project) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const updatedProject = await prisma.project.update({
        where:{
            id: projectId,
        }
        ,data:{
            scheduleConfig:schedule,
        }
    })

    return NextResponse.json(updatedProject);
}