import React from 'react';
import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import TaskBoard from '../TaskBoard';
import {RootState} from '../../app/store';
import {Priority, TaskStatus} from '../../constants';
import {moveTask} from '../../features/tasks/tasksActions';
import {setDraggingItemId} from '../../features/dragging/draggingSlice';

const mockStore = configureStore<RootState>([]);
const initialState = {
    tasks: {
        tasks: [
            {
                id: '1',
                title: 'Test Task',
                description: 'This is a test task',
                status: TaskStatus.TO_DO,
                priority: Priority.MEDIUM,
                assignedTo: 'Bob Dylan',
                dueDate: '',
            }
        ]
    },
    dragging: {draggingItemId: null},
    modals: {isEditModalOpen: false, isDetailsModalOpen: false, isConfirmModalOpen: false, taskId: null}
};
const store = mockStore(initialState);

const renderWithProvider = (component: React.ReactNode) => {
    return render(<Provider store={store}>{component}</Provider>);
};

test('should change task status on drop', async () => {
    renderWithProvider(<TaskBoard/>);

    await act(async () => {
        // Start dragging
        fireEvent.dragStart(screen.getByText('Test Task'));

        // Ensure the task is being dragged
        const actionsAfterDragStart = store.getActions();
        console.log('Actions after drag start:', actionsAfterDragStart);
        expect(actionsAfterDragStart).toContainEqual(setDraggingItemId('1'));

        // Mocking DataTransfer
        const dataTransfer = {
            setData: jest.fn(),
            getData: jest.fn(),
            clearData: jest.fn()
        };

        // Simulate drag over and drop events on the "In Progress" column
        fireEvent.dragOver(screen.getByText('In Progress'), {dataTransfer});
        fireEvent.drop(screen.getByText('In Progress'), {dataTransfer});
    });

    // Log the actions for debugging
    const actionsAfterDrop = store.getActions();
    console.log('Actions after drop:', actionsAfterDrop);

    // Wait for the actions to be dispatched
    await waitFor(() => {
        const actions = store.getActions();
        console.log('Actions after waitFor:', actions);
        expect(actions).toContainEqual(expect.objectContaining({
            type: moveTask.type,
            payload: {id: '1', status: TaskStatus.IN_PROGRESS}
        }));
    });
});
