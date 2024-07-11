import React from 'react';
import {useTasks} from '../hooks/useTasks';
import {useDrag} from '../hooks/useDrag';

interface TaskProps {
    id: string;
    title: string;
    description: string;
}

const Task: React.FC<TaskProps> = React.memo(({id, title, description}) => {
    const {remove} = useTasks();
    const {startDrag, endDrag} = useDrag();

    const handleDragStart = () => {
        startDrag(id);
    };

    const handleDragEnd = () => {
        endDrag();
    };

    const handleDelete = () => {
        remove(id);
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className="bg-white p-4 rounded shadow mb-4"
        >
            <h3 className="font-bold">{title}</h3>
            <p>{description}</p>
            <div className="mt-2 flex justify-end space-x-2">
                <button onClick={handleDelete} className="text-red-500">Delete</button>
            </div>
        </div>
    );
});

export default Task;
