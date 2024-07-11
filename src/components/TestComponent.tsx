import React from 'react';
import {useDispatch} from 'react-redux';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {addTask} from '../features/tasks/tasksSlice';
import {v4 as uuidv4} from 'uuid';

const TestComponent: React.FC = () => {
    const tasks = useTypedSelector(state => state.tasks.tasks || []);
    const dispatch = useDispatch();

    const handleAddTask = () => {
        dispatch(addTask({id: uuidv4(), title: 'New Task', description: 'Task description', status: 'To Do'}));
    };

    return (
        <div>
            <button onClick={handleAddTask} className="bg-blue-500 text-white p-2 rounded">Add Task</button>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>{task.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default TestComponent;
