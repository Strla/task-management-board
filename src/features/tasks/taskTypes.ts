import {Priority, TaskStatus} from '../../constants';


export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    dueDate?: string;
    priority?: Priority;
    assignedTo?: string;
}
