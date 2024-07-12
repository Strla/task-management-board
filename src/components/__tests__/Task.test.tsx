import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {setDraggingItemId} from '../../features/dragging/draggingSlice';
import Task from '../Task';
import {Task as TaskType} from '../../features/tasks/taskTypes';
import {RootState} from '../../app/store';
import {Priority, TaskStatus} from '../../constants';

const mockStore = configureStore<RootState>([]);
const initialState = {
    tasks: {
        tasks: [],
        filter: { // Add the filter property
            assignedTo: '',
            priority: '',
            dueDate: ''
        }
    },
    dragging: {draggingItemId: null},
    modals: {
        isEditModalOpen: false,
        isDetailsModalOpen: false,
        isConfirmModalOpen: false,
        taskId: null
    }
};
const store = mockStore(initialState);

const renderWithProvider = (component: React.ReactNode) => {
    return render(<Provider store={store}>{component}</Provider>);
};

const task: TaskType = {
    id: '1',
    title: 'Test Task',
    description: 'This is a test task',
    status: TaskStatus.TO_DO,
    priority: Priority.MEDIUM,
    assignedTo: 'Bob Dylan',
    dueDate: '',
};

test('should start and end drag', async () => {
    renderWithProvider(<Task task={task}/>);

    // Start dragging
    fireEvent.dragStart(screen.getByText('Test Task'));
    let actions = store.getActions();
    expect(actions).toContainEqual(setDraggingItemId(task.id));

    // End dragging
    fireEvent.dragEnd(screen.getByText('Test Task'));
    actions = store.getActions();
    expect(actions).toContainEqual(setDraggingItemId(null));
});
