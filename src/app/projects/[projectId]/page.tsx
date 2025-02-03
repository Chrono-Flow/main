"use client"

import { use, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function ProjectPage({ params }: { params: Promise<{ projectId: string }> }) {
    const { projectId } = use(params)
    const router = useRouter()
    const { data: session } = useSession()

    useEffect(() => {
        const fetchProjectAndRedirect = async () => {
            try {
                const response = await fetch(`/api/projects/${projectId}`)

                if (!response.ok) {
                    throw new Error('Project not found')
                }

                const project = await response.json()

                // Redirect to dashboard with the project URL
                router.replace('/dashboard')

                // Update URL without navigation
                history.replaceState(
                    { projectId: project.id },
                    '',
                    `/projects/${project.id}`
                )

                // Store the project ID in sessionStorage for dashboard to pick up
                sessionStorage.setItem('selectedProjectId', project.id)
            } catch (err) {
                // If project not found, redirect to dashboard with error state
                sessionStorage.setItem('projectError', 'Project not found')
                router.replace('/dashboard')
            }
        }

        if (projectId) {
            fetchProjectAndRedirect()
        }
    }, [projectId, router])

    return <div>Loading...</div>
} 