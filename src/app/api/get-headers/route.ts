import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const projectId = request.headers.get('x-project-id')

    return NextResponse.json({
        projectId: projectId || null
    })
} 