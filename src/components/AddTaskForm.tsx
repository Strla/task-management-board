import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {addTask} from '../features/tasks/tasksActions';
import {TaskStatus} from '../features/tasks/taskTypes';
import {TASK_STATUSES} from "../constants";
import {v4 as uuidv4} from 'uuid';
import Modal from './Modal';

interface AddTaskFormProps {
    isOpen: boolean;
    onClose: () => void;
}

interface IFormInput {
    title: string;
    description: string;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({isOpen, onClose}) => {
    const dispatch = useDispatch();
    const {register, handleSubmit, reset, formState: {errors}} = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        dispatch(addTask({
            id: uuidv4(),
            title: data.title,
            description: data.description,
            status: TASK_STATUSES.TO_DO as TaskStatus
        }));
        reset();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-2xl font-bold mb-4">Add Task</h2>

                <div className="mb-4">
                    <input
                        {...register('title', {
                            required: 'Title is required',
                            minLength: {value: 3, message: 'Title must be at least 3 characters'},
                            maxLength: {value: 50, message: 'Title cannot exceed 50 characters'}
                        })}
                        type="text"
                        placeholder="Task title"
                        className={`block w-full p-2 border rounded ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>

                <div className="mb-4">
          <textarea
              {...register('description', {
                  required: 'Description is required',
                  minLength: {value: 5, message: 'Description must be at least 5 characters'},
                  maxLength: {value: 200, message: 'Description cannot exceed 200 characters'}
              })}
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
