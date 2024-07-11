import React, {useState} from 'react';
import {useTasks} from '../hooks/useTasks';
import {useDrag} from '../hooks/useDrag';
import TaskForm from './TaskForm';
import {Task as TaskType} from '../features/tasks/taskTypes';

interface TaskProps {
    task: TaskType;
}

const Task: React.FC<TaskProps> = React.memo(({task}) => {
    const {remove} = useTasks();
    const {startDrag, endDrag} = useDrag();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const openEditModal = () => setIsEditModalOpen(true);
    const closeEditModal = () => setIsEditModalOpen(false);

    const handleDragStart = () => {
        startDrag(task.id);
    };

    const handleDragEnd = () => {
        endDrag();
    };

    const handleDelete = () => {
        remove(task.id);
    };

    return (
        <>
            <div
                draggable
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                className="bg-white p-4 rounded shadow mb-4"
            >
                <h3 className="font-bold">{task.title}</h3>
                <p>{task.description}</p>
                <div className="mt-2 flex justify-end space-x-2">
                    <button onClick={openEditModal} className="text-blue-500">Edit</button>
                    <button onClick={handleDelete} className="text-red-500">Delete</button>
                </div>
            </div>
            <TaskForm isOpen={isEditModalOpen} onClose={closeEditModal} task={task}/>
        </>
    );
});

export default Task;
