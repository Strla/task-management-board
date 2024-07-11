import React from 'react';
import {validationRules} from '../utils/validationRules';
import {useAddTaskForm} from '../hooks/useAddTaskForm';
import Modal from './Modal';

interface AddTaskFormProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({isOpen, onClose}) => {
    const {register, handleSubmit, errors, onSubmit, handleClose} = useAddTaskForm(onClose);

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-2xl font-bold mb-4">Add Task</h2>

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

                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Task</button>
            </form>
        </Modal>
    );
};

export default AddTaskForm;
