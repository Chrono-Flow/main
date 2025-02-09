"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Loader from '@/lib/spinner'
import { ActionType } from '@prisma/client'

interface Log {
    id: string
    createdAt: string
    message: string
    level: 'INFO' | 'WARN' | 'ERROR'
    ip: string | null,
    userAgent: string | null,
    action: ActionType | null
}

export default function LogsPage() {
    const [logs, setLogs] = useState<Log[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [rowSize, setRowSize] = useState(10)
    const [refreshStatus, setRefreshStatus] = useState<'idle' | 'refreshing'>('idle')
    const { data: session } = useSession()

    const fetchLogs = async () => {
        try {
            setRefreshStatus('refreshing')
            const response = await fetch('/api/logs')
            if (!response.ok) {
                throw new Error('Failed to fetch logs')
            }
            const data = await response.json()
            setLogs(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
            setLoading(false)
            setRefreshStatus('idle')
        }
    }

    // Initial fetch
    useEffect(() => {
        fetchLogs()
    }, [])

    // Auto-refresh every 7 seconds
    useEffect(() => {
        const interval = setInterval(fetchLogs, 7000)
        return () => clearInterval(interval)
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <title>Loading Logs...</title>
                <Loader />
            </div>
        )
    }

    if (error || !logs) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-red-200">
                <title>Error</title>
                <div className="text-white bg-red-500 px-4  py-1 rounded-xl">Error: s{error}</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <title>Logs</title>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-gray-900">User Logs</h1>
                        <div className={`
                             rounded-xl px-4 text-sm transition-all  duration-200 ml-4
                            ${refreshStatus === 'refreshing' ? 'bg-yellow-200 animate-pulse' : 'bg-green-200'}
                        `} >

                            {refreshStatus === 'refreshing' ? 'Refreshing...' : 'Idle'}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={fetchLogs}
                            className="px-3 py-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                        >
                            Refresh
                        </button>
                        <div className="flex items-center">
                            <label htmlFor="rowSize" className="mr-2 text-sm font-medium text-gray-700">
                                Rows per page:
                            </label>
                            <select
                                id="rowSize"
                                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                                value={rowSize}
                                onChange={(e) => setRowSize(Number(e.target.value))}
                            >
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                        #
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                        Timestamp
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                        Level
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Message
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        IP
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        User Agent
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {logs.slice(0, rowSize).map((log, index) => (
                                    <tr key={log.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(log.createdAt).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                                ${log.level === 'ERROR' ? 'bg-red-100 text-red-800' :
                                                    log.level === 'WARN' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-green-100 text-green-800'}`}>
                                                {log.level}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 break-words">
                                            {log.message}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 ">
                                            {log?.ip}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 ">
                                            {log?.userAgent}
                                        </td>
                                        <td className={`px-6 py-4 text-sm text-gray-500 ${log?.action === "CREATE" ? "bg-green-100 text-green-800" : log?.action === "UPDATE" ? "bg-yellow-100 text-yellow-800" : log?.action === "DELETE" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"}`}>
                                            {log?.action}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
