import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';// Create a new professional spinner component
import { Spinner } from './Spinner';
interface YourComponentProps {
    projectId: string;
}

export function YourComponent({ projectId }: YourComponentProps) {
    const [isLoading, setIsLoading] = useState(false);

    const updateNodes = useCallback(
        debounce(async (nodes: any) => {
            try {
                setIsLoading(true);
                const response = await fetch(`/api/projects/${projectId}/nodes`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nodes })
                });

                if (!response.ok) {
                    if (response.status === 429) {
                        // Handle rate limiting gracefully
                        return;
                    }
                    throw new Error('Failed to update nodes');
                }

                const data = await response.json();
                // Handle successful update
            } catch (error) {
                console.error('Error:', error);
                // Handle error state
            } finally {
                setIsLoading(false);
            }
        }, 2000),
        [projectId]
    );

    // ... rest of your component code ...

    return (
        <div>
            {isLoading && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 shadow-xl">
                        <Spinner className="w-8 h-8 text-primary" />
                        <p className="mt-2 text-sm text-gray-600">Saving changes...</p>
                    </div>
                </div>
            )}
            {/* Your component content */}
        </div>
    );
} 