import {configureStore} from '@reduxjs/toolkit';
import tasksReducer from '../tasksSlice';
import {addTask, deleteTask, editTask} from "../tasksActions";
import draggingReducer from '../../dragging/draggingSlice';
import modalsReducer from '../../modals/modalsSlice';
import {loadFromLocalStorage, saveToLocalStorage} from '../../../utils/localStorage';
import {Priority, TASKS_STORAGE_KEY, TaskStatus} from '../../../constants';

beforeEach(() => {
    localStorage.clear();
});

describe('Task Persistence', () => {
    it('should save tasks to localStorage when a task is added', () => {
        const store = configureStore({
            reducer: {
                tasks: tasksReducer,
                dragging: draggingReducer,
                modals: modalsReducer,
            },
        });

        const task = {
            id: '1',
            title: 'Test Task',
            description: 'This is a test task',
            status: TaskStatus.TO_DO,
            priority: Priority.MEDIUM,
            assignedTo: 'Bob Dylan',
            dueDate: '',
        };

        store.dispatch(addTask(task));
        saveToLocalStorage(store.getState());

        const storedState = localStorage.getItem(TASKS_STORAGE_KEY);
        expect(storedState).toBe(JSON.stringify(store.getState()));
    });

    it('should load tasks from localStorage when the store initializes', () => {
        const preloadedState = {
            tasks: {
                tasks: [
                    {
                        id: '1',
                        title: 'Test Task',
                        description: 'This is a test task',
                        status: 'TO_DO',
                        priority: 'MEDIUM',
                        assignedTo: 'Bob Dylan',
                        dueDate: '',
                    },
                ],
                filter: {},
            },
            dragging: {
                draggingItemId: null,
            },
            modals: {
                isEditModalOpen: false,
                isDetailsModalOpen: false,
                isConfirmModalOpen: false,
                taskId: null,
            },
        };

        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(preloadedState));

        const store = configureStore({
            reducer: {
                tasks: tasksReducer,
                dragging: draggingReducer,
                modals: modalsReducer,
            },
            preloadedState: loadFromLocalStorage(),
        });

        expect(store.getState()).toEqual(preloadedState);
    });

    it('should save tasks to localStorage when a task is updated', () => {
        const store = configureStore({
            reducer: {
                tasks: tasksReducer,
                dragging: draggingReducer,
                modals: modalsReducer,
            },
        });

        const task = {
            id: '1',
            title: 'Test Task',
            description: 'This is a test task',
            status: TaskStatus.TO_DO,
            priority: Priority.MEDIUM,
            assignedTo: 'Bob Dylan',
            dueDate: '',
        };

        store.dispatch(addTask(task));

        const updatedTask = {
            ...task,
            title: 'Updated Test Task',
            description: 'This is an updated test task',
        };

        store.dispatch(editTask(updatedTask));
        saveToLocalStorage(store.getState());

        const storedState = localStorage.getItem(TASKS_STORAGE_KEY);
        expect(storedState).toBe(JSON.stringify(store.getState()));
    });

    it('should save tasks to localStorage when a task is deleted', () => {
        const store = configureStore({
            reducer: {
                tasks: tasksReducer,
                dragging: draggingReducer,
                modals: modalsReducer,
            },
        });

        const task = {
            id: '1',
            title: 'Test Task',
            description: 'This is a test task',
            status: TaskStatus.TO_DO,
            priority: Priority.MEDIUM,
            assignedTo: 'Bob Dylan',
            dueDate: '',
        };

        store.dispatch(addTask(task));
        store.dispatch(deleteTask(task.id));
        saveToLocalStorage(store.getState());

        const storedState = localStorage.getItem(TASKS_STORAGE_KEY);
        expect(storedState).toBe(JSON.stringify(store.getState()));
    });
});
