import React from 'react';
import {validationRules} from '../utils/validationRules';
import {useTaskForm} from '../hooks/useTaskForm';
import Modal from './Modal';
import {Task} from '../features/tasks/taskTypes';

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

                <button type="submit"
                        className="bg-blue-500 text-white p-2 rounded">{task ? 'Save Changes' : 'Add Task'}</button>
            </form>
        </Modal>
    );
};

export default TaskForm;
