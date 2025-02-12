export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}

interface ScheduleConfig {
    schedule: string;
    timezone: string;
    enabled: boolean;
}

interface ProjectData {
    name: string;
    description: string;
    image?: string;
    type?: 'SCHEDULE' | 'WORKFLOW' | "BACKEND";
    scheduleConfig?: ScheduleConfig;
}

export const validateProject = (data: any): ProjectData => {
    if (!data.name) {
        throw new ValidationError('Project name is required');
    }
    if (data.name.length < 3) {
        throw new ValidationError('Project name must be at least 3 characters long');
    }
    if (data.name.length > 50) {
        throw new ValidationError('Project name must be less than 50 characters');
    }
    if (!data.description) {
        throw new ValidationError('Project description is required');
    }

    // Validate schedule config if project type is schedule
    if (data.type === 'schedule' && data.scheduleConfig) {
        if (!data.scheduleConfig.schedule) {
            throw new ValidationError('Schedule expression is required for schedule type projects');
        }
        // Basic cron expression validation
        if (!/^[\d\s*,\-/]+$/.test(data.scheduleConfig.schedule)) {
            throw new ValidationError('Invalid schedule expression format');
        }
    }

    return {
        name: data.name.trim(),
        description: data.description.trim(),
        image: data.image,
        type: data.type || 'schedule',
        scheduleConfig: data.type === 'schedule' ? {
            schedule: data.scheduleConfig?.schedule || '* * * * *',
            timezone: data.scheduleConfig?.timezone || 'UTC',
            enabled: data.scheduleConfig?.enabled ?? true
        } : undefined,
    };
}; 