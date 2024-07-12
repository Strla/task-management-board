import React from 'react';
import {useTasks} from '../hooks/useTasks';
import {TaskStatus} from '../constants';
import TaskList from './TaskList';
import {useDrag} from '../hooks/useDrag';

const TaskBoard: React.FC = React.memo(() => {
    const {move} = useTasks();
    const {draggingItemId, endDrag} = useDrag();

    const handleDrop = (e: React.DragEvent, status: TaskStatus) => {
        e.preventDefault();
        console.log('Drop event triggered');
        if (draggingItemId) {
            console.log('Moving task:', draggingItemId, 'to status:', status);
            move(draggingItemId, status);
            endDrag();  // Ensure dragging state is reset after drop
        }
    };

    return (
        <div className="flex flex-col p-4 max-w-[1440px] mx-auto w-full md:flex-row gap-4">
            <TaskList status={TaskStatus.TO_DO} onDrop={(e) => handleDrop(e, TaskStatus.TO_DO)}/>
            <TaskList status={TaskStatus.IN_PROGRESS} onDrop={(e) => handleDrop(e, TaskStatus.IN_PROGRESS)}/>
            <TaskList status={TaskStatus.COMPLETED} onDrop={(e) => handleDrop(e, TaskStatus.COMPLETED)}/>
        </div>
    );
});

export default TaskBoard;
