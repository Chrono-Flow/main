"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Loader from '@/lib/spinner'
import { Line, Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js'
import { motion } from 'framer-motion'

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

interface Project {
    id: string
    name: string
    description: string
    type: string
    createdAt: string
    status: string
    flowCount: number
}

interface User {
    id: string
    name: string | null
    email: string
    emailVerified: string | null
    image: string | null
    createdAt: string
    updatedAt: string
    projects: Project[]
}

export default function UserPage() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState('flows')
    const { data: session } = useSession()

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('/api/user')
                if (!response.ok) {
                    throw new Error('Failed to fetch user data')
                }
                const data = await response.json()
                setUser(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred')
            } finally {
                setLoading(false)
            }
        }

        fetchUserData()
    }, [])

    const getChartData = () => {
        if (!user) return null

        const monthlyData = user.projects.reduce((acc: { [key: string]: number }, project) => {
            const month = new Date(project.createdAt).toLocaleString('default', { month: 'short' })
            acc[month] = (acc[month] || 0) + 1
            return acc
        }, {})

        return {
            labels: Object.keys(monthlyData),
            datasets: [
                {
                    label: 'Projects Created',
                    data: Object.values(monthlyData),
                    fill: true,
                    borderColor: 'rgb(99, 102, 241)',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    tension: 0.4,
                }
            ]
        }
    }

    const getProjectTypeData = () => {
        if (!user) return null

        const typeData = user.projects.reduce((acc: { [key: string]: number }, project) => {
            acc[project.type] = (acc[project.type] || 0) + 1
            return acc
        }, {})

        return {
            labels: Object.keys(typeData),
            datasets: [{
                label: 'Projects by Type',
                data: Object.values(typeData),
                backgroundColor: [
                    'rgba(99, 102, 241, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(147, 51, 234, 0.8)'
                ],
            }]
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader />
            </div>
        )
    }

    if (error || !user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-red-50">
                <div className="text-white bg-red-500 px-4 py-2 rounded-xl">
                    Error: {error}
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* User Profile Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-lg shadow-sm p-6 mb-6"
                >
                    <div className="flex items-center space-x-6">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="h-24 w-24 rounded-full overflow-hidden"
                        >
                            <img
                                src={user.image || '/default-avatar.png'}
                                alt={user.name || 'User'}
                                className="h-full w-full object-cover"
                            />
                        </motion.div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{user.name || 'Anonymous User'}</h1>
                            <p className="text-gray-500">{user.email}</p>
                            <div className="mt-2 text-sm text-gray-500">
                                Member since {new Date(user.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {[
                        { title: 'Total Projects', value: user.projects.length, color: 'indigo' },
                        { title: 'Active Projects', value: user.projects.filter(p => p.status === 'active').length, color: 'green' },
                        { title: 'Total Flows', value: user.projects.reduce((acc, proj) => acc + proj.flowCount, 0), color: 'blue' }
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white rounded-lg shadow-sm p-6"
                        >
                            <h3 className="text-lg font-semibold text-gray-900">{stat.title}</h3>
                            <p className={`text-3xl font-bold text-${stat.color}-600`}>{stat.value}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Analytics Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-white rounded-lg shadow-sm p-6 mb-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Analytics</h2>
                        <div className="flex space-x-2">
                            {['flows', 'types'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 rounded-md transition-all ${activeTab === tab
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="h-[300px]">
                        {activeTab === 'flows' ? (
                            <Line
                                data={getChartData() || { labels: [], datasets: [] }}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    animations: {
                                        tension: {
                                            duration: 1000,
                                            easing: 'linear',
                                        }
                                    },
                                }}
                            />
                        ) : (
                            <Bar
                                data={getProjectTypeData() || { labels: [], datasets: [] }}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                }}
                            />
                        )}
                    </div>
                </motion.div>

                {/* Recent Projects Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="bg-white rounded-lg shadow-sm p-6"
                >
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Projects</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Flows</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {user.projects.slice(0, 5).map((project, index) => (
                                    <motion.tr
                                        key={project.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{project.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.type}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs rounded-full ${project.status === 'active'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {project.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(project.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {project.flowCount}
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

