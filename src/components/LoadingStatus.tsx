'use client';

import { useLoading } from '@/context/LoadingContext';

export default function LoadingStatus() {
    const { isLoading } = useLoading();

    return (
        <div className={`
            flex items-center gap-2 px-3 py-[2px] rounded-full
            transition-all duration-300 border
            ${isLoading
                ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                : 'bg-green-50 text-green-700 border-green-200'
            }
        `}>
            <div className={`
                w-2 h-2 rounded-full text-[2px]
                ${isLoading
                    ? 'bg-yellow-400 animate-pulse'
                    : 'bg-green-400'
                }
            `} />
            {isLoading ? 'Loading...' : 'Loaded'}
        </div>
    );
} 