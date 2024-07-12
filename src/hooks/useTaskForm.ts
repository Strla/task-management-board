import {SubmitHandler, useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {addTask, editTask} from '../features/tasks/tasksActions';
import {Task} from '../features/tasks/taskTypes';
import {Priority, TaskStatus} from '../constants';
import {v4 as uuidv4} from 'uuid';

interface IFormInput {
    title: string;
    description: string;
    dueDate?: string;
    priority?: Priority;
    assignedTo?: string;
}

export const useTaskForm = (onClose: () => void, task?: Task) => {
    const dispatch = useDispatch();
    const {register, handleSubmit, reset, formState: {errors}} = useForm<IFormInput>({
        defaultValues: task ? {
            title: task.title,
            description: task.description,
            dueDate: task.dueDate,
            priority: task.priority,
            assignedTo: task.assignedTo,
        } : {},
    });

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            if (task) {
                dispatch(editTask({...task, ...data}));
            } else {
                dispatch(addTask({
                    id: uuidv4(),
                    title: data.title,
                    description: data.description,
                    status: TaskStatus.TO_DO,
                    dueDate: data.dueDate,
                    priority: data.priority,
                    assignedTo: data.assignedTo,
                }));
            }
            reset();
            onClose();
        } catch (error) {
            console.error('Failed to submit task:', error);
            alert('Failed to submit task. Please try again.');
        }
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    return {
        register,
        handleSubmit,
        errors,
        onSubmit,
        handleClose,
    };
};
