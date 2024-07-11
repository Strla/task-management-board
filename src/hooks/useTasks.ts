import {useTypedSelector} from './useTypedSelector';
import {useDispatch} from 'react-redux';
import {addTask, deleteTask, editTask, moveTask} from '../features/tasks/tasksActions';
import {Task, TaskStatus} from '../features/tasks/taskTypes';

export const useTasks = () => {
    const tasks = useTypedSelector(state => state.tasks.tasks);
    const dispatch = useDispatch();

    const add = (task: Task) => dispatch(addTask(task));
    const edit = (task: Task) => dispatch(editTask(task));
    const remove = (taskId: string) => dispatch(deleteTask(taskId));
    const move = (taskId: string, status: TaskStatus) => dispatch(moveTask({id: taskId, status}));

    return {tasks, add, edit, remove, move};
};
