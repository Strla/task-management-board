export enum TaskStatus {
    ToDo = 'To Do',
    InProgress = 'In Progress',
    Completed = 'Completed'
}

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    dueDate?: string;
    priority?: 'Low' | 'Medium' | 'High';
    assignedTo?: string;
}
