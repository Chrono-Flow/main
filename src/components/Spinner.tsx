import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface SpinnerProps {
    className?: string;
}

export function Spinner({ className }: SpinnerProps) {
    return (
        <div className={cn('relative', className)}>
            <div className="animate-spin rounded-full border-4 border-gray-200">
                <div className="absolute top-0 left-0 rounded-full border-4 border-primary border-t-transparent animate-spin w-full h-full"></div>
            </div>
        </div>
    );
} 