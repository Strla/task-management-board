import React from 'react';
import {act, fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import TaskForm from '../TaskForm';
import {addTask} from '../../features/tasks/tasksActions';
import {Priority, TaskStatus} from '../../constants';

const mockStore = configureStore([]);
const store = mockStore({
    tasks: {tasks: []},
    modals: {isEditModalOpen: false, isDetailsModalOpen: false, isConfirmModalOpen: false, taskId: null}
});

const renderWithProvider = (component: React.ReactNode) => {
    return render(<Provider store={store}>{component}</Provider>);
};

test('should create a task', async () => {
    renderWithProvider(<TaskForm isOpen={true} onClose={() => {
    }}/>);

    await act(async () => {
        // Simulate user input
        fireEvent.change(screen.getByLabelText('Task Title'), {target: {value: 'Test Task'}});
        fireEvent.change(screen.getByLabelText('Task Description'), {target: {value: 'This is a test task'}});
        fireEvent.change(screen.getByLabelText('Priority'), {target: {value: Priority.MEDIUM}});
        fireEvent.change(screen.getByLabelText('Assign To'), {target: {value: 'Bob Dylan'}});

        // Simulate form submission
        fireEvent.click(screen.getByRole('button', {name: /add task/i}));
    });

    // Check if the addTask action was dispatched
    const actions = store.getActions();
    expect(actions).toContainEqual(
        addTask({
            id: expect.any(String),
            title: 'Test Task',
            description: 'This is a test task',
            status: TaskStatus.TO_DO,
            priority: Priority.MEDIUM,
            assignedTo: 'Bob Dylan',
            dueDate: '',
        })
    );
});
