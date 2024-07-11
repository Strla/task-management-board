import {TASK_STATUSES} from '../../constants';

export type TaskStatus = typeof TASK_STATUSES[keyof typeof TASK_STATUSES];

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    dueDate?: string;
    priority?: 'Low' | 'Medium' | 'High';
    assignedTo?: string;
}
