"use client"

import { createContext, useContext, useState } from 'react'
import { ProjectContext } from '@/context/LoadingContext'

export default function ProjectLayout({ children }) {
    const [currentProject, setCurrentProject] = useState(null)

    return (
        <ProjectContext.Provider value={{ currentProject, setCurrentProject }}>
            <div className="flex flex-col h-screen bg-linear-to-br from-gray-50 to-gray-100">
                {/* Reuse the same layout as dashboard */}
                {children}
            </div>
        </ProjectContext.Provider>
    )
} 