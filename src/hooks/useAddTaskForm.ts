import {SubmitHandler, useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {addTask} from '../features/tasks/tasksActions';
import {TASK_STATUSES} from "../constants";
import {v4 as uuidv4} from 'uuid';

interface IFormInput {
    title: string;
    description: string;
}

export const useAddTaskForm = (onClose: () => void) => {
    const dispatch = useDispatch();
    const {register, handleSubmit, reset, formState: {errors}} = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        dispatch(addTask({
            id: uuidv4(),
            title: data.title,
            description: data.description,
            status: TASK_STATUSES.TO_DO
        }));
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
