import {createSlice} from '@reduxjs/toolkit';
import {Task} from './taskTypes';
import {addTask, deleteTask, editTask, moveTask} from './tasksActions';

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
            .addCase(addTask, (state, action) => {
                state.tasks.push(action.payload);
            })
            .addCase(editTask, (state, action) => {
                const index = state.tasks.findIndex(task => task.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(deleteTask, (state, action) => {
                state.tasks = state.tasks.filter(task => task.id !== action.payload);
            })
            .addCase(moveTask, (state, action) => {
                const index = state.tasks.findIndex(task => task.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index].status = action.payload.status;
                }
            });
    },
});

export default tasksSlice.reducer;
