import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Task} from './taskTypes';
import {addTask, deleteTask, editTask, moveTask} from './tasksActions';
import {TaskStatus} from "../../constants";

export interface TasksState {
    tasks: Task[];
}

const initialState: TasksState = {
    tasks: [],
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addTask, (state, action: PayloadAction<Task>) => {
                state.tasks.push(action.payload);
            })
            .addCase(editTask, (state, action: PayloadAction<Task>) => {
                const index = state.tasks.findIndex(task => task.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(deleteTask, (state, action: PayloadAction<string>) => {
                state.tasks = state.tasks.filter(task => task.id !== action.payload);
            })
            .addCase(moveTask, (state, action: PayloadAction<{ id: string; status: TaskStatus }>) => {
                const index = state.tasks.findIndex(task => task.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index].status = action.payload.status;
                }
            });
    },
});

export default tasksSlice.reducer;
