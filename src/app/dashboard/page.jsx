"use client"

import { useSession, signOut } from "next-auth/react"
import { useState, useCallback, useEffect, useMemo } from "react"
import ReactFlow, { Background, Controls, Handle, Position, applyNodeChanges, applyEdgeChanges, addEdge } from 'reactflow'
import 'reactflow/dist/style.css'
import { useRouter } from 'next/navigation'
import NewProjectModal from '@/components/NewProjectModal'
import { useLoading } from '@/context/LoadingContext'
import LoadingStatus from '@/components/LoadingStatus'
import AddNodeModal from '@/components/AddNodeModal'
import debounce from 'lodash/debounce'
import Link from "next/link"
import { MorphingText } from "@/components/morph-Text"
import Image from "next/image"
import { useToast } from "@/components/ui/Toast/ToastContext"


// const initialNodes = [
// 	{
// 		id: '1',
// 		type: 'input',
// 		data: { label: 'Start' },
// 		position: { x: 250, y: 25 },
// 		style: {
// 			background: '#4F46E5',
// 			color: 'white',
// 			border: 'none',
// 			borderRadius: '8px',
// 			padding: '10px 20px',
// 		},
// 	},
// 	{
// 		id: '2',
// 		data: { label: 'Process' },
// 		position: { x: 250, y: 125 },
// 		style: {
// 			background: '#fff',
// 			border: '1px solid #E2E8F0',
// 			borderRadius: '8px',
// 			padding: '10px 20px',
// 		},
// 	},
// 	{
// 		id: '3',
// 		type: 'output',
// 		data: { label: 'End' },
// 		position: { x: 250, y: 225 },
// 		style: {
// 			background: '#DC2626',
// 			color: 'white',
// 			border: 'none',
// 			borderRadius: '8px',
// 			padding: '10px 20px',
// 		},
// 	},
// ];

// const initialEdges = [
// 	{
// 		id: 'e1-2',
// 		source: '1',
// 		target: '2',
// 		animated: true,
// 		style: { stroke: '#94A3B8' },
// 	},
// 	{
// 		id: 'e2-3',
// 		source: '2',
// 		target: '3',
// 		animated: true,
// 		style: { stroke: '#94A3B8' },
// 	},
// ];

const initialScheduleNode = {
	id: 'schedule-1',
	type: 'scheduleNode',
	position: { x: 250, y: 25 },
	data: {
		label: 'Schedule',
		schedule: '* * * * *'
	},
	style: {
		background: '#4F46E5',
		color: 'white',
		border: 'none',
		borderRadius: '8px',
		padding: '10px 20px',
	}
};

const ScheduleNode = ({ data }) => {
	return (
		<div className="schedule-node">
			<Handle type="source" position={Position.Bottom} />
			<div className="p-2">
				<div className="font-medium">{data.label}</div>
				<div className="text-sm text-gray-300">{data.schedule}</div>
			</div>
		</div>
	);
};

const InputNode = ({ data }) => {
	return (
		<div className="input-node">
			<Handle type="source" position={Position.Bottom} />
			<div className="p-2">
				<div className="font-medium">{data.label}</div>
			</div>
		</div>
	);
};

const OutputNode = ({ data }) => {
	return (
		<div className="output-node">
			<Handle type="target" position={Position.Top} />
			<div className="p-2">
				<div className="font-medium">{data.label}</div>
			</div>
		</div>
	);
};

const DefaultNode = ({ data }) => {
	return (
		<div className="default-node">
			<Handle type="target" position={Position.Top} />
			<div className="p-2">
				<div className="font-medium">{data.label}</div>
			</div>
			<Handle type="source" position={Position.Bottom} />
		</div>
	);
};

export default function DashboardPage() {
	const { data: session } = useSession()
	const [sidebarWidth, setSidebarWidth] = useState(320)
	const [isResizing, setIsResizing] = useState(false)
	const [showCommandMenu, setShowCommandMenu] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const [selectedIndex, setSelectedIndex] = useState(0)
	const [showNewProjectModal, setShowNewProjectModal] = useState(false)
	const [projects, setProjects] = useState([])
	const [currentProject, setCurrentProject] = useState(null)

	const [nodes, setNodes] = useState(currentProject?.nodes || [initialScheduleNode])

	const [error, setError] = useState(null)
	const [scheduleConfig, setScheduleConfig] = useState(null)
	const [showNodeModal, setShowNodeModal] = useState(false)
	const [isConnecting, setIsConnecting] = useState(false)
	const [projectId, setProjectId] = useState(null)

	const router = useRouter()
	const { setIsLoading } = useLoading()

	const MIN_WIDTH = 80  // Reduced from 250 to 80

	const MAX_WIDTH = 600

	const { showToast } = useToast();
	const commands = [
		{ id: 'new-project', name: 'New Project', description: 'Create a new project', icon: '📑', action: () => setShowNewProjectModal(true) },
		{ id: 'share', name: 'Share Workspace', description: 'Share current workspace', icon: '🔗', action: () => navigator.clipboard.writeText(window.location.href) },
		{ id: 'export', name: 'Export Workflow', description: 'Export current workflow', icon: '📤', action: () => console.log('Export') },
		{ id: 'settings', name: 'Open Settings', description: 'Open workspace settings', icon: '⚙️', action: () => console.log('Settings') },
		{ id: 'help', name: 'Help & Documentation', description: 'View documentation', icon: '❓', action: () => console.log('Help') },
		{ id: 'signout', name: 'Sign Out', description: 'Sign out of your account', icon: '👋', action: () => signOut() },
		{ id: 'add-node', name: 'Add Node', description: 'Add a new node to workflow', icon: '➕', action: () => setShowNodeModal(true) },
		{ id: 'connect-nodes', name: 'Connect Nodes', description: 'Connect existing nodes', icon: '🔗', action: () => setIsConnecting(true) },
	]

	const startResizing = useCallback((e) => {
		setIsResizing(true)
		e.preventDefault()
	}, [])

	const stopResizing = useCallback(() => {
		setIsResizing(false)
	}, [])

	const resize = useCallback((e) => {
		if (isResizing) {
			const newWidth = e.clientX
			if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
				setSidebarWidth(newWidth)
			}
		}
	}, [isResizing])

	useEffect(() => {
		window.addEventListener('mousemove', resize)
		window.addEventListener('mouseup', stopResizing)
		return () => {
			window.removeEventListener('mousemove', resize)
			window.removeEventListener('mouseup', stopResizing)
		}
	}, [resize, stopResizing])

	// Helper function to determine if we should show compact view
	// const isCompactView = sidebarWidth < 200

	// Filter commands based on search query
	const filteredCommands = commands.filter(command =>
		command.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
		command.description.toLowerCase().includes(searchQuery.toLowerCase())
	)

	// Handle keyboard shortcuts
	useEffect(() => {
		const handleKeyDown = (e) => {
			// Open command menu on Ctrl+P
			if (e.ctrlKey && e.key === 'p') {
				e.preventDefault()
				setShowCommandMenu(true)
				setSearchQuery('')
				setSelectedIndex(0)
			}

			// Handle command menu navigation
			if (showCommandMenu) {
				switch (e.key) {
					case 'ArrowDown':
						e.preventDefault()
						setSelectedIndex(prev =>
							prev < filteredCommands.length - 1 ? prev + 1 : prev
						)
						break
					case 'ArrowUp':
						e.preventDefault()
						setSelectedIndex(prev => prev > 0 ? prev - 1 : prev)
						break
					case 'Enter':
						e.preventDefault()
						if (filteredCommands[selectedIndex]) {
							filteredCommands[selectedIndex].action()
							setShowCommandMenu(false)
						}
						break
					case 'Escape':
						e.preventDefault()
						setShowCommandMenu(false)
						break
				}
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [showCommandMenu, selectedIndex, filteredCommands])

	// Add function to delete project
	const handleDeleteProject = async (projectId) => {
		try {
			const response = await fetch(`/api/projects/${projectId}`, {
				method: 'DELETE',
			});

			if (response.ok) {
				// Remove project from local state
				setProjects(projects.filter(p => p.id !== projectId));

				// If deleted project was current project, reset current project
				if (currentProject?.id === projectId) {
					setCurrentProject(null);
					history.replaceState({}, '', '/dashboard');
				}
			} else {
				console.error('Failed to delete project');
			}
		} catch (error) {
			console.error('Error deleting project:', error);
		}
	};

	// Function to fetch and set project
	const fetchAndSetProject = async (projectId) => {
		try {
			const response = await fetch(`/api/projects/${projectId}`)
			if (!response.ok) {
				throw new Error('Project not found')
			}
			const project = await response.json()
			setCurrentProject(project)
			// Update URL without navigation
			history.replaceState(
				{ projectId: project.id },
				'',
				`/projects/${project.id}`
			)
		} catch (err) {
			setError('Project not found')
			history.replaceState({}, '', '/dashboard')
		}
	}

	// Effect to handle project ID from headers and URL
	useEffect(() => {
		const handleProjectId = async () => {
			try {
				// Try to get project ID from response headers (set by middleware)
				const response = await fetch('/api/get-headers')
				const { projectId } = await response.json()

				if (projectId) {
					await fetchAndSetProject(projectId)
					setProjectId(projectId)
					return
				}

				// Fallback: Check if we're on a project URL
				const path = window.location.pathname
				if (path.startsWith('/projects/')) {
					const urlProjectId = path.split('/projects/')[1]
					if (urlProjectId) {
						await fetchAndSetProject(urlProjectId)
						setProjectId(urlProjectId)
					}
				}
			} catch (err) {
				console.error('Error handling project ID:', err)
			}
		}

		handleProjectId()
	}, [])

	// Fetch all projects
	const fetchProjects = async () => {
		setIsLoading(true)
		try {
			const response = await fetch('/api/projects')
			if (response.ok) {
				const data = await response.json()
				setProjects(data)
			}
		} catch (error) {
			console.error('Error fetching projects:', error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchProjects()
	}, [])

	// Add handler for project creation success
	const handleProjectCreated = () => {
		fetchProjects() // Re-fetch projects list
		setShowNewProjectModal(false)
	}

	// Update handleProjectClick to use history.replaceState
	const handleProjectClick = (projectId) => {
		setIsLoading(true)
		const project = projects.find(p => p.id === projectId);
		if (project) {
			setCurrentProject(project);

			if (project.type === 'schedule') {
				if (project.scheduleConfig) {
					setNodes([{
						...initialScheduleNode,
						data: {
							...initialScheduleNode.data,
							label: project.name,
							schedule: project.scheduleConfig.schedule
						}
					}]);
					setScheduleConfig(project.scheduleConfig);
				} else {
					setError('Schedule configuration not found for this project');
					setScheduleConfig({
						schedule: '* * * * *',
						timezone: 'UTC',
						enabled: false
					});
				}
			} else {
				setNodes(initialNodes);
				setScheduleConfig(null);
			}

			history.replaceState(
				{ projectId },
				'',
				`/projects/${projectId}`
			);
		}
		setIsLoading(false)
	}

	// Add save functionality for schedule config
	const handleScheduleConfigSave = async (scheduleConfig) => {
		if (!currentProject || !scheduleConfig) {
			setError('Schedule configuration not found for this project');
			showToast('Schedule configuration not found for this project', 'error');
			return;
		}

		console.log("HANDLE-SCHEDULE-CONFIG",{scheduleConfig})
		try {
			const response = await fetch(`/api/projects/${currentProject.id}/schedule`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(scheduleConfig)
			});

			if (!response.ok) {
				showToast('Failed to save schedule configuration', 'info');
			}

			// Update the node to reflect the new schedule
			setNodes(nodes => nodes.map(node =>
				node.type === 'scheduleNode'
					? { ...node, data: { ...node.data, schedule: scheduleConfig.schedule } }
					: node
			));

		} catch (error) {
			showToast('Failed to save schedule configuration', 'info');
			setError(error.message);
		}
	};

	// 1. First, memoize nodeTypes as it has no dependencies on other hooks
	const nodeTypes = useMemo(() => ({
		scheduleNode: ScheduleNode,
		input: InputNode,
		output: OutputNode,
		default: DefaultNode
	}), []);

	// 1. First, memoize the debounced API call
	const debouncedUpdateNodes = useMemo(
		() =>
			debounce(async (updatedNodes, projectId) => {
				try {
					const response = await fetch('/api/nodes', {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							projectId,
							nodes: updatedNodes
						})
					});

					if (!response.ok) {
						throw new Error('Failed to update nodes');
					}
				} catch (error) {
					console.error('Error updating nodes:', error);
				}
			}, 1000),
		[]
	);

	// 2. Define onNodesChange before using it in flowProps
	const onNodesChange = useCallback((changes) => {
		setNodes(prevNodes => {
			const updatedNodes = applyNodeChanges(changes, prevNodes);

			if (projectId) {
				debouncedUpdateNodes(updatedNodes, projectId);
			}

			return updatedNodes;
		});
	}, [projectId, debouncedUpdateNodes]);

	// 3. Now we can safely use onNodesChange in flowProps
	const flowProps = useMemo(() => ({
		nodes,
		onNodesChange,
		nodeTypes,
		fitView: true,
	}), [nodes, handleScheduleConfigSave, nodeTypes]);

	return (
		<DashboardContent
			currentProject={currentProject}
			setCurrentProject={setCurrentProject}
			flowProps={flowProps}
			saveConfig={handleScheduleConfigSave}
			nodes={nodes}
			setNodes={setNodes}
		/>
	);
}

function DashboardContent({ currentProject, setCurrentProject, flowProps, saveConfig, nodes, setNodes }) {
	// Move all state and hooks here
	const { data: session } = useSession();
	const [sidebarWidth, setSidebarWidth] = useState(320);
	const [isResizing, setIsResizing] = useState(false);
	const [showCommandMenu, setShowCommandMenu] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [showNewProjectModal, setShowNewProjectModal] = useState(false);
	const [projects, setProjects] = useState([]);
	const [error, setError] = useState(null);
	const [scheduleConfig, setScheduleConfig] = useState(null);
	const [showNodeModal, setShowNodeModal] = useState(false);
	const [isConnecting, setIsConnecting] = useState(false);
	const [projectId, setProjectId] = useState(null);

	const router = useRouter();
	const { setIsLoading } = useLoading();

	const MIN_WIDTH = 80;  // Reduced from 250 to 80

	const MAX_WIDTH = 600;
	const commands = [
		{ id: 'new-project', name: 'New Project', description: 'Create a new project', icon: '📑', action: () => setShowNewProjectModal(true) },
		{ id: 'share', name: 'Share Workspace', description: 'Share current workspace', icon: '🔗', action: () => navigator.clipboard.writeText(window.location.href) },
		{ id: 'export', name: 'Export Workflow', description: 'Export current workflow', icon: '📤', action: () => console.log('Export') },
		{ id: 'settings', name: 'Open Settings', description: 'Open workspace settings', icon: '⚙️', action: () => console.log('Settings') },
		{ id: 'help', name: 'Help & Documentation', description: 'View documentation', icon: '❓', action: () => console.log('Help') },
		{ id: 'signout', name: 'Sign Out', description: 'Sign out of your account', icon: '👋', action: () => signOut() },
		{ id: 'add-node', name: 'Add Node', description: 'Add a new node to workflow', icon: '➕', action: () => setShowNodeModal(true) },
		{ id: 'connect-nodes', name: 'Connect Nodes', description: 'Connect existing nodes', icon: '🔗', action: () => setIsConnecting(true) },
		{ id: 'user', name: 'User Page', description: 'View user profile', icon: '🧑‍💻', action: () => router.push('/dashboard/user') },
	];

	const startResizing = useCallback((e) => {
		setIsResizing(true);
	}, []);

	const stopResizing = useCallback(() => {
		setIsResizing(false);
	}, []);

	const resize = useCallback((e) => {
		if (isResizing) {
			const newWidth = e.clientX;
			if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
				setSidebarWidth(newWidth);
			}
		}
	}, [isResizing]);



	const initialNodes = [
		{
			id: '1',
			type: 'input',
			data: { label: 'Start' },
			position: { x: 250, y: 25 },
			style: {
				background: '#4F46E5',
				color: 'white',
				border: 'none',
				borderRadius: '8px',
				padding: '10px 20px',
			},
		},
		{
			id: '2',
			data: { label: 'Process' },
			position: { x: 250, y: 125 },
			style: {
				background: '#fff',
				border: '1px solid #E2E8F0',
				borderRadius: '8px',
				padding: '10px 20px',
			},
		},
		{
			id: '3',
			type: 'output',
			data: { label: 'End' },
			position: { x: 250, y: 225 },
			style: {
				background: '#DC2626',
				color: 'white',
				border: 'none',
				borderRadius: '8px',
				padding: '10px 20px',
			},
		},
	];

	const initialEdges = [
		{
			id: 'e1-2',
			source: '1',
			target: '2',
			animated: true,
			style: { stroke: '#94A3B8' },
		},
		{
			id: 'e2-3',
			source: '2',
			target: '3',
			animated: true,
			style: { stroke: '#94A3B8' },
		},
	];




	useEffect(() => {
		window.addEventListener('mousemove', resize);
		window.addEventListener('mouseup', stopResizing);
		return () => {
			window.removeEventListener('mousemove', resize);
			window.removeEventListener('mouseup', stopResizing);
		};
	}, [resize, stopResizing]);

	// Helper function to determine if we should show compact view
	const isCompactView = sidebarWidth < 200;

	// Filter commands based on search query
	const filteredCommands = commands.filter(command =>
		command.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
		command.description.toLowerCase().includes(searchQuery.toLowerCase())
	);

	// Handle keyboard shortcuts
	useEffect(() => {
		const handleKeyDown = (e) => {
			// Open command menu on Ctrl+P
			if (e.ctrlKey && e.key === 'p') {
				e.preventDefault();
				setShowCommandMenu(true);
				setSearchQuery('');
				setSelectedIndex(0);
			}

			// Handle command menu navigation
			if (showCommandMenu) {
				switch (e.key) {
					case 'ArrowDown':
						e.preventDefault();
						setSelectedIndex(prev =>
							prev < filteredCommands.length - 1 ? prev + 1 : prev
						);
						break;
					case 'ArrowUp':
						e.preventDefault();
						setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
						break;
					case 'Enter':
						e.preventDefault();
						if (filteredCommands[selectedIndex]) {
							filteredCommands[selectedIndex].action();
							setShowCommandMenu(false);
						}
						break;
					case 'Escape':
						e.preventDefault();
						setShowCommandMenu(false);
						break;
				}
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [showCommandMenu, selectedIndex, filteredCommands]);

	// Add function to delete project
	const handleDeleteProject = async (projectId) => {
		try {
			const response = await fetch(`/api/projects/${projectId}`, {
				method: 'DELETE',
			});

			if (response.ok) {
				// Remove project from local state
				setProjects(projects.filter(p => p.id !== projectId));

				// If deleted project was current project, reset current project
				if (currentProject?.id === projectId) {
					setCurrentProject(null);
					history.replaceState({}, '', '/dashboard');
				}
			} else {
				console.error('Failed to delete project');
			}
		} catch (error) {
			console.error('Error deleting project:', error);
		}
	};

	// Function to fetch and set project
	const fetchAndSetProject = async (projectId) => {
		try {
			const response = await fetch(`/api/projects/${projectId}`);
			if (!response.ok) {
				throw new Error('Project not found');
			}
			const project = await response.json();
			setCurrentProject(project);
			// Update URL without navigation
			history.replaceState(
				{ projectId: project.id },
				'',
				`/projects/${project.id}`
			);
		} catch (err) {
			setError('Project not found');
			history.replaceState({}, '', '/dashboard');
		}
	};

	// Effect to handle project ID from headers and URL
	useEffect(() => {
		const handleProjectId = async () => {
			try {
				// Try to get project ID from response headers (set by middleware)
				const response = await fetch('/api/get-headers');
				const { projectId } = await response.json();

				if (projectId) {
					await fetchAndSetProject(projectId);
					setProjectId(projectId);
					return;
				}

				// Fallback: Check if we're on a project URL
				const path = window.location.pathname;
				if (path.startsWith('/projects/')) {
					const urlProjectId = path.split('/projects/')[1];
					if (urlProjectId) {
						await fetchAndSetProject(urlProjectId);
						setProjectId(urlProjectId);
					}
				}
			} catch (err) {
				console.error('Error handling project ID:', err);
			}
		};

		handleProjectId();
	}, []);

	// Fetch all projects
	const fetchProjects = async () => {
		setIsLoading(true);
		try {
			const response = await fetch('/api/projects');
			if (response.ok) {
				const data = await response.json();
				setProjects(data);
			}
		} catch (error) {
			console.error('Error fetching projects:', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchProjects();
	}, []);

	// Add handler for project creation success
	const handleProjectCreated = () => {
		fetchProjects(); // Re-fetch projects list
		setShowNewProjectModal(false);
	};

	// Update handleProjectClick to use history.replaceState
	const handleProjectClick = (projectId) => {
		setIsLoading(true);
		const project = projects.find(p => p.id === projectId);
		if (project) {
			setCurrentProject(project);

			if (project.type === 'schedule') {
				if (project.scheduleConfig) {
					setNodes([{
						...initialScheduleNode,
						data: {
							...initialScheduleNode.data,
							label: project.name,
							schedule: project.scheduleConfig.schedule
						}
					}]);
					setScheduleConfig(project.scheduleConfig);
				} else {
					setError('Schedule configuration not found for this project');
					setScheduleConfig({
						schedule: '* * * * *',
						timezone: 'UTC',
						enabled: false
					});
				}
			} else {
				setNodes(initialNodes);
				setScheduleConfig(null);
			}

			history.replaceState(
				{ projectId },
				'',
				`/projects/${projectId}`
			);
		}
		setIsLoading(false);
	};

	// Add save functionality for schedule config
	const handleScheduleConfigSave = async () => {
		if (!currentProject || !scheduleConfig) return;

		try {
			const response = await fetch(`/api/projects/${currentProject.id}/schedule`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(scheduleConfig)
			});

			if (!response.ok) {

				throw new Error('Failed to save schedule configuration');
			}

			// Update the node to reflect the new schedule
			setNodes(nodes => nodes.map(node =>
				node.type === 'scheduleNode'
					? { ...node, data: { ...node.data, schedule: scheduleConfig.schedule } }
					: node
			));

		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className="flex flex-col h-screen bg-linear-to-br from-gray-50 to-gray-100">
			{/* Add error message display */}
			{error && (
				<div className="bg-red-50 border-l-4 border-red-400 p-4">
					<div className="flex">
						<div className="shrink-0">
							<svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
								<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
							</svg>
						</div>
						<div className="ml-3">
							<p className="text-sm text-red-700">
								{error}
							</p>
						</div>
						<div className="ml-auto pl-3">
							<div className="-mx-1.5 -my-1.5">
								<button
									onClick={() => setError(null)}
									className="inline-flex rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
								>
									<span className="sr-only">Dismiss</span>
									<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
										<path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Top Navbar */}
			<nav className="bg-white border-b border-gray-200 shadow-xs">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div className="flex items-center gap-4">
							<h1 className="text-lg text-gray-900">
								<div className="text-sm text-gray-500">Chronoflow</div>
								{currentProject ? currentProject.name : 'Workflow Dashboard'}
							</h1>
						</div>
						<div className="flex items-center gap-4">
							<Link href="/dashboard/logs" target="_blank" className=" text-sm font-medium text-green-500">
								Logs
							</Link>
							<LoadingStatus />
							<button
								className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
								onClick={() => setShowNewProjectModal(true)}
							>
								New Project
							</button>
							<button
								className="px-4 py-2 text-sm flex gap-x-2 font-medium text-gray-700 bg-white border border-gray-300 rounded-2xl shadow-xs hover:bg-gray-50"
								onClick={() => router.push('/dashboard/user')}
							>
								User 🧑‍💻
							</button>



							<button
								className="px-4 py-2 text-sm flex gap-x-2 font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-xs hover:bg-gray-50"
								onClick={() => signOut()}
							>
								Sign Out 🔑
							</button>
						</div>
					</div>
				</div>
			</nav>

			{/* Main Content */}
			<div
				className="flex flex-1 overflow-hidden"
				onMouseMove={resize}
				style={{ cursor: isResizing ? 'col-resize' : 'auto' }}
			>
				{/* Projects Sidebar */}
				<div
					className="bg-white border-r-2 border-gray-200 overflow-y-auto shrink-0 md:block hidden transition-all duration-200"
					style={{ width: sidebarWidth }}
				>
					<div className={`${isCompactView ? 'p-2' : 'p-3'}`}>
						<h2 className={`font-semibold text-gray-900 ${isCompactView ? 'text-center text-xs mb-2' : 'text-sm mb-3'}`}>
							{isCompactView ? '📁' : 'Your Projects'}
						</h2>
						<div className={`space-y-2`}>
							{projects.map((project) => (
								<div
									key={project.id}
									onClick={() => handleProjectClick(project.id)}
									className={`
										bg-white rounded-xl border border-gray-200 
										hover:border-indigo-500 hover:shadow-xs 
										cursor-pointer transition-all duration-200
										${isCompactView ? 'p-1.5' : 'p-2'}
										h-[70px] flex items-center gap-3
										${currentProject?.id === project.id ? 'border-indigo-500 shadow-xs' : ''}
									`}
									title={isCompactView ? project.name : ''}
								>
									{/* Project Image */}
									<div
										className="w-12 h-12 rounded-full bg-cover bg-center shrink-0 border border-gray-100"
										style={{ backgroundImage: `url(${project.image || '/default-project-image.png'})` }}
									/>

									{!isCompactView && (
										<div className="flex-1 min-w-0">
											<div className="flex justify-between items-center">
												<h3 className="font-medium text-xs text-gray-900 truncate">{project.name}</h3>
												<span className="text-[9px] text-gray-500 shrink-0 ml-2">
													{new Date(project.updatedAt).toLocaleDateString()}
												</span>
											</div>
											<p className="text-[10px] text-gray-600 truncate mt-0.5">{project.description}</p>
											<div className="flex items-center gap-1 mt-1">
												<span className="inline-flex items-center px-1 py-0.5 rounded-full text-[8px] font-medium bg-indigo-50 text-indigo-700">
													{project.flowCount} flow
												</span>
												<span className="inline-flex items-center px-1 py-0.5 rounded-full text-[8px] font-medium bg-green-50 text-green-700">
													{project.type.toLowerCase()}
												</span>
											</div>
										</div>
									)}

									{/* Delete button */}
									<button
										onClick={(e) => {
											e.stopPropagation();
											if (window.confirm('Are you sure you want to delete this project?')) {
												handleDeleteProject(project.id);
											}
										}}
										className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
										title="Delete project"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-4 w-4"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
											/>
										</svg>
									</button>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Enhanced Resizer */}
				<div
					className="relative select-none shrink-0"
					onMouseDown={startResizing}
					style={{ cursor: 'col-resize' }}
				>
					<div className="absolute inset-y-0 w-6 -left-3 group cursor-col-resize flex items-center justify-center">
						{/* Vertical dots pattern */}
						<div className="w-0.5 h-16 bg-gray-200 rounded-full relative group-hover:bg-indigo-500 transition-colors">
							<div className="absolute inset-0 flex flex-col justify-center items-center gap-1.5">
								<div className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-indigo-400 transition-colors" />
								<div className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-indigo-400 transition-colors" />
								<div className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-indigo-400 transition-colors" />
							</div>
						</div>
					</div>
				</div>

				{/* React Flow Workspace */}
				{
					currentProject ? (
						<div className="flex-1 bg-white border-l-2 border-gray-200">
							<ReactFlow {...flowProps}>
								<Background color="#94a3b8" gap={16} size={1} />
								<Controls className="bg-white border border-gray-200 shadow-md rounded-lg" />
							</ReactFlow>
						</div>
					) : (
						<div className="flex-1 bg-white border-l-2 border-gray-200">
							<div className="flex flex-col gap-y-4 justify-center items-center h-full">
								<Image src="/empty.jpg" alt="Empty State" loading="lazy" width={500} height={400} className="rounded-2xl opacity-80 shadow-lg" draggable={false} title="Empty State" />
								<p className="text-gray-800 text-center text-sm lg:text-3xl font-extrabold">Seems you have not selected any project yet</p>
							</div>
						</div>
					)
				}
				{/* Schedule Config Panel */}
				{scheduleConfig && (
					<div className="w-80 border-l border-gray-200 bg-white p-4 overflow-y-auto">
						<div className="flex justify-between items-center mb-4">
							<h3 className="font-semibold text-gray-900">Schedule Configuration</h3>
							<button
								onClick={handleScheduleConfigSave}
								className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
							>
								Save
							</button>
						</div>
						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Cron Expression
								</label>
								<input
									type="text"
									value={scheduleConfig.schedule}
									onChange={(e) => setScheduleConfig(prev => ({
										...prev,
										schedule: e.target.value
									}))}
									className="w-full px-3 py-2 border border-gray-300 rounded-md"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Timezone
								</label>
								<select
									value={scheduleConfig.timezone}
									onChange={(e) => setScheduleConfig(prev => ({
										...prev,
										timezone: e.target.value
									}))}
									className="w-full px-3 py-2 border border-gray-300 rounded-md"
								>
									<option value="UTC">UTC</option>
									<option value="local">Local</option>
								</select>
							</div>
							<div className="flex items-center">
								<input
									type="checkbox"
									id="enabled"
									checked={scheduleConfig.enabled}
									onChange={(e) => setScheduleConfig(prev => ({
										...prev,
										enabled: e.target.checked
									}))}
									className="h-4 w-4 text-indigo-600 rounded-sm"
								/>
								<label htmlFor="enabled" className="ml-2 text-sm text-gray-700">
									Enable Schedule
								</label>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Command Menu Modal */}
			{showCommandMenu && (
				<div className="fixed inset-0 bg-black/50 flex items-start justify-center pt-[20vh] z-50">
					<div className="bg-white w-full max-w-xl rounded-xl shadow-2xl overflow-hidden border border-gray-200">
						{/* Search Input */}
						<div className="p-4 border-b border-gray-200">
							<div className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-lg">
								<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
								</svg>
								<input
									type="text"
									className="flex-1 bg-transparent border-0 outline-hidden text-gray-900 placeholder-gray-400"
									placeholder="Search commands..."
									value={searchQuery}
									onChange={(e) => {
										setSearchQuery(e.target.value)
										setSelectedIndex(0)
									}}
									autoFocus
								/>
								<kbd className="hidden sm:inline-block px-2 py-0.5 text-xs text-gray-500 bg-gray-200 rounded-sm">ESC to close</kbd>
							</div>
						</div>

						{/* Commands List */}
						<div className="max-h-[300px] overflow-y-auto">
							{filteredCommands.length === 0 ? (
								<div className="px-4 py-12 text-center text-gray-500">
									No commands found
								</div>
							) : (
								<div className="p-2">
									{filteredCommands.map((command, index) => (
										<button
											key={command.id}
											className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${index === selectedIndex
												? 'bg-indigo-500 text-white'
												: 'text-gray-700 hover:bg-gray-100'
												}`}
											onClick={() => {
												command.action()
												setShowCommandMenu(false)
											}}
										>
											<span className="text-xl">{command.icon}</span>
											<div className="flex-1">
												<div className={`font-medium ${index === selectedIndex ? 'text-white' : 'text-gray-900'
													}`}>
													{command.name}
												</div>
												<div className={`text-sm ${index === selectedIndex ? 'text-indigo-100' : 'text-gray-500'
													}`}>
													{command.description}
												</div>
											</div>
										</button>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			)}

			{/* Add modal component */}
			<NewProjectModal
				isOpen={showNewProjectModal}
				onClose={() => setShowNewProjectModal(false)}
				onSuccess={handleProjectCreated}
			/>

			{/* Add Node Modal */}
			<AddNodeModal
				isOpen={showNodeModal}
				onClose={() => setShowNodeModal(false)}
				onAdd={async (newNode) => {
					setNodes((nds) => [...nds, newNode]);
					await saveConfig(nodes);
					// onNodesChange([{ type: 'add', item: newNode }]);
				}}
			/>
		</div>
	);
}
