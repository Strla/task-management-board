import {createAction} from '@reduxjs/toolkit';
import {Task} from './taskTypes';
import {TaskStatus} from "../../constants";

export const addTask = createAction<Task>('tasks/addTask');
export const editTask = createAction<Task>('tasks/editTask');
export const deleteTask = createAction<string>('tasks/deleteTask');
export const moveTask = createAction<{ id: string; status: TaskStatus }>('tasks/moveTask');
