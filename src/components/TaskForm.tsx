import React from 'react';
import {validationRules} from '../utils/validationRules';
import {useTaskForm} from '../hooks/useTaskForm';
import Modal from './Modal';
import {Task} from '../features/tasks/taskTypes';
import {Priority, USERS} from '../constants';

interface TaskFormProps {
    isOpen: boolean;
    onClose: () => void;
    task?: Task;
}

const TaskForm: React.FC<TaskFormProps> = ({isOpen, onClose, task}) => {
    const {register, handleSubmit, errors, onSubmit, handleClose} = useTaskForm(onClose, task);

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-2xl font-bold mb-4">{task ? 'Edit Task' : 'Add Task'}</h2>

                <div className="mb-4">
                    <input
                        {...register('title', validationRules.title)}
                        type="text"
                        placeholder="Task title"
                        className={`block w-full p-2 border rounded ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>

                <div className="mb-4">
          <textarea
              {...register('description', validationRules.description)}
              placeholder="Task description"
              className={`block w-full p-2 border rounded ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
          ></textarea>
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                </div>

                <div className="mb-4">
                    <input
                        {...register('dueDate')}
                        type="date"
                        className={`block w-full p-2 border rounded ${errors.dueDate ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate.message}</p>}
                </div>

                <div className="mb-4">
                    <select
                        {...register('priority')}
                        className={`block w-full p-2 border rounded ${errors.priority ? 'border-red-500' : 'border-gray-300'}`}
                    >
                        <option value="">Select Priority</option>
                        <option value={Priority.LOW}>Low</option>
                        <option value={Priority.MEDIUM}>Medium</option>
                        <option value={Priority.HIGH}>High</option>
                    </select>
                    {errors.priority && <p className="text-red-500 text-sm mt-1">{errors.priority.message}</p>}
                </div>

                <div className="mb-4">
                    <select
                        {...register('assignedTo')}
                        className={`block w-full p-2 border rounded ${errors.assignedTo ? 'border-red-500' : 'border-gray-300'}`}
                    >
                        <option value="">Assign to</option>
                        {USERS.map(user => (
                            <option key={user} value={user}>{user}</option>
                        ))}
                    </select>
                    {errors.assignedTo && <p className="text-red-500 text-sm mt-1">{errors.assignedTo.message}</p>}
                </div>

                <button type="submit"
                        className="bg-blue-500 text-white p-2 rounded">{task ? 'Save Changes' : 'Add Task'}</button>
            </form>
        </Modal>
    );
};

export default TaskForm;
