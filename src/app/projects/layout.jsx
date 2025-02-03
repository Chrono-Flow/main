"use client"

import { createContext, useContext, useState } from 'react'

// Create context for project navigation
export const ProjectContext = createContext()

export default function ProjectLayout({ children }) {
    const [currentProject, setCurrentProject] = useState(null)

    return (
        <ProjectContext.Provider value={{ currentProject, setCurrentProject }}>
            <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                {/* Reuse the same layout as dashboard */}
                {children}
            </div>
        </ProjectContext.Provider>
    )
} 