import {validationRules} from '../utils/validationRules';
import {useTaskForm} from '../hooks/useTaskForm';
import Modal from './Modal';
import {Task} from '../features/tasks/taskTypes';
import {Priority, USERS} from '../constants';
import Button from './Button';

interface TaskFormProps {
    isOpen: boolean;
    onClose: () => void;
    task?: Task;
}

const TaskForm = ({isOpen, onClose, task}: TaskFormProps) => {
    const {register, handleSubmit, errors, onSubmit, handleClose} = useTaskForm(onClose, task);

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-2xl font-bold mb-4">{task ? 'Edit Task' : 'Add Task'}</h2>

                <div className="mb-4">
                    <label htmlFor="title" className="block mb-2">Task Title</label>
                    <input
                        id="title"
                        {...register('title', validationRules.title)}
                        type="text"
                        placeholder="Task title"
                        className={`block w-full p-2 border rounded ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block mb-2">Task Description</label>
                    <textarea
                        id="description"
                        {...register('description', validationRules.description)}
                        placeholder="Task description"
                        className={`block w-full p-2 border rounded ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="dueDate" className="block mb-2">Due Date</label>
                    <input
                        id="dueDate"
                        {...register('dueDate')}
                        type="date"
                        className={`block w-full p-2 border rounded ${errors.dueDate ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate.message}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="priority" className="block mb-2">Priority</label>
                    <select
                        id="priority"
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
                    <label htmlFor="assignedTo" className="block mb-2">Assign To</label>
                    <select
                        id="assignedTo"
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

                <Button type="submit" className="bg-blue-500 text-white">
                    {task ? 'Save Changes' : 'Add Task'}
                </Button>
            </form>
        </Modal>
    );
};

export default TaskForm;
