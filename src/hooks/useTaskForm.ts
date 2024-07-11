import {SubmitHandler, useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {addTask, editTask} from '../features/tasks/tasksActions';
import {Task} from '../features/tasks/taskTypes';
import {TASK_STATUSES} from "../constants";
import {v4 as uuidv4} from 'uuid';

interface IFormInput {
    title: string;
    description: string;
}

export const useTaskForm = (onClose: () => void, task?: Task) => {
    const dispatch = useDispatch();
    const {register, handleSubmit, reset, formState: {errors}} = useForm<IFormInput>({
        defaultValues: task ? {title: task.title, description: task.description} : {title: '', description: ''},
    });

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        if (task) {
            dispatch(editTask({...task, title: data.title, description: data.description}));
        } else {
            dispatch(addTask({
                id: uuidv4(),
                title: data.title,
                description: data.description,
                status: TASK_STATUSES.TO_DO
            }));
        }
        reset();
        onClose();
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
