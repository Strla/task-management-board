import React from 'react';
import {useDispatch} from 'react-redux';
import {moveTask} from '../features/tasks/tasksSlice';
import {TaskStatus} from '../features/tasks/taskTypes';
import TaskList from './TaskList';

const TaskBoard: React.FC = () => {
    const dispatch = useDispatch();

    const handleDrop = (e: React.DragEvent, status: TaskStatus) => {
        const id = e.dataTransfer.getData('text/plain');
        dispatch(moveTask({id, status}));
    };

    return (
        <div className="flex space-x-4 p-4">
            <TaskList status={TaskStatus.ToDo} onDrop={handleDrop}/>
            <TaskList status={TaskStatus.InProgress} onDrop={handleDrop}/>
            <TaskList status={TaskStatus.Completed} onDrop={handleDrop}/>
        </div>
    );
};

export default TaskBoard;
