'use client';

import { useState } from 'react';

interface AddNodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (nodeData: any) => void;
}

export default function AddNodeModal({ isOpen, onClose, onAdd }: AddNodeModalProps) {
    const [nodeData, setNodeData] = useState({
        type: 'scheduleNode',
        label: '',
        schedule: '* * * * *'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd({
            id: `node-${Date.now()}`,
            type: nodeData.type,
            data: {
                label: nodeData.label,
                schedule: nodeData.schedule
            },
            position: { x: 250, y: Math.random() * 300 }
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
                <h2 className="text-xl font-semibold mb-4">Add New Node</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Node Type
                        </label>
                        <select
                            value={nodeData.type}
                            onChange={(e) => setNodeData(prev => ({ ...prev, type: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                            <option value="scheduleNode">Schedule Node</option>
                            <option value="actionNode">Action Node</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Label
                        </label>
                        <input
                            type="text"
                            value={nodeData.label}
                            onChange={(e) => setNodeData(prev => ({ ...prev, label: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    {nodeData.type === 'scheduleNode' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Schedule
                            </label>
                            <input
                                type="text"
                                value={nodeData.schedule}
                                onChange={(e) => setNodeData(prev => ({ ...prev, schedule: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="* * * * *"
                            />
                        </div>
                    )}
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                        >
                            Add Node
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 