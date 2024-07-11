import React from 'react';
import {useDispatch} from 'react-redux';
import {deleteTask} from '../features/tasks/tasksSlice';

interface TaskProps {
    id: string;
    title: string;
    description: string;
}

const Task: React.FC<TaskProps> = ({id, title, description}) => {
    const dispatch = useDispatch();

    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData('text/plain', id);
    };

    const handleDelete = () => {
        dispatch(deleteTask(id));
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            className="bg-white p-4 rounded shadow mb-4"
        >
            <h3 className="font-bold">{title}</h3>
            <p>{description}</p>
            <div className="mt-2 flex justify-end space-x-2">
                <button onClick={handleDelete} className="text-red-500">Delete</button>
            </div>
        </div>
    );
};

export default Task;
