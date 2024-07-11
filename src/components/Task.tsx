import React from 'react';
import {useDispatch} from 'react-redux';
import {deleteTask} from '../features/tasks/tasksActions';
import {setDraggingItemId} from '../features/dragging/draggingSlice';

interface TaskProps {
    id: string;
    title: string;
    description: string;
}

const Task: React.FC<TaskProps> = React.memo(({id, title, description}) => {
    const dispatch = useDispatch();

    const handleDragStart = () => {
        dispatch(setDraggingItemId(id));
    };

    const handleDragEnd = () => {
        dispatch(setDraggingItemId(null));
    };

    const handleDelete = () => {
        dispatch(deleteTask(id));
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
