import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export async function GET(request: NextRequest) {
    const session = await getServerSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const logs = await prisma.user.findUnique({
        where: {
            email: session?.user?.email as string
        },
        include: {
            logs: true
        },
    });

    const reversedLogs = logs?.logs.reverse();

    return NextResponse.json(reversedLogs);
}


export async function POST(request: NextRequest) {
    const { userId, message, level } = await request.json()
    let ipAddress = request.headers.get("x-real-ip") as string;

    const forwardedFor = request.headers.get("x-forwarded-for") as string;
    if (!ipAddress && forwardedFor) {
        ipAddress = forwardedFor?.split(",").at(0) ?? "Unknown";
    }
    const log = await prisma.logs.create({

        data: {
            userId,
            message,
            level,
            ip: ipAddress
        }
    })

    return NextResponse.json(log)
}       