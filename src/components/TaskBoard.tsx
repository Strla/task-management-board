import React from 'react';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {useDispatch} from 'react-redux';
import {moveTask} from '../features/tasks/tasksActions';
import {TaskStatus} from '../features/tasks/taskTypes';
import TaskList from './TaskList';

const TaskBoard: React.FC = React.memo(() => {
    const dispatch = useDispatch();
    const draggingItemId = useTypedSelector(state => state.dragging.draggingItemId);

    const handleDrop = (e: React.DragEvent, status: TaskStatus) => {
        e.preventDefault();
        if (draggingItemId) {
            dispatch(moveTask({id: draggingItemId, status}));
        }
    };

    return (
        <div className="flex space-x-4 p-4">
            <TaskList status={TaskStatus.ToDo} onDrop={handleDrop}/>
            <TaskList status={TaskStatus.InProgress} onDrop={handleDrop}/>
            <TaskList status={TaskStatus.Completed} onDrop={handleDrop}/>
        </div>
    );
});

export default TaskBoard;
