import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'To Do' | 'In Progress' | 'Completed';
    dueDate?: string;
    priority?: 'Low' | 'Medium' | 'High';
    assignedTo?: string;
}

export interface TasksState {
    tasks: Task[];
}

const initialState: TasksState = {
    tasks: [],
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask(state, action: PayloadAction<Task>) {
            state.tasks.push(action.payload);
        },
        editTask(state, action: PayloadAction<Task>) {
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        deleteTask(state, action: PayloadAction<string>) {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
        moveTask(state, action: PayloadAction<{ id: string; status: Task['status'] }>) {
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index].status = action.payload.status;
            }
        },
    },
});

export const {addTask, editTask, deleteTask, moveTask} = tasksSlice.actions;
export default tasksSlice.reducer;
