import React from 'react';
import {useTasks} from '../hooks/useTasks';
import {TASK_STATUSES} from '../constants';
import TaskList from './TaskList';
import {useDrag} from '../hooks/useDrag';

const TaskBoard: React.FC = React.memo(() => {
    const {move} = useTasks();
    const {draggingItemId} = useDrag();

    const handleDrop = (e: React.DragEvent, status: keyof typeof TASK_STATUSES) => {
        e.preventDefault();
        if (draggingItemId) {
            move(draggingItemId, TASK_STATUSES[status]);
        }
    };

    return (
        <div className="flex space-x-4 p-4">
            <TaskList status={TASK_STATUSES.TO_DO} onDrop={(e) => handleDrop(e, 'TO_DO')}/>
            <TaskList status={TASK_STATUSES.IN_PROGRESS} onDrop={(e) => handleDrop(e, 'IN_PROGRESS')}/>
            <TaskList status={TASK_STATUSES.COMPLETED} onDrop={(e) => handleDrop(e, 'COMPLETED')}/>
        </div>
    );
});

export default TaskBoard;
