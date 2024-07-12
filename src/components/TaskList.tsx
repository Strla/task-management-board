import React from 'react';
import {useTypedSelector} from '../hooks/useTypedSelector';
import Task from './Task';
import {TaskStatus} from "../constants";

interface TaskListProps {
    status: TaskStatus;
    onDrop: (e: React.DragEvent, status: TaskStatus) => void;
}

const TaskList: React.FC<TaskListProps> = ({status, onDrop}) => {
    const tasks = useTypedSelector(state => state.tasks.tasks);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const renderTasks = () =>
        tasks
            .filter(task => task.status === status)
            .map(task => (
                <Task key={task.id} task={task}/>
            ));

    return (
        <div
            className="flex-1 bg-gray-100 rounded max-h-[80vh] overflow-y-auto"
            onDrop={(e) => onDrop(e, status)}
            onDragOver={handleDragOver}
        >
            <h2 className="text-xl font-bold sticky top-0 bg-gray-100 w-full z-10 p-4">{status}</h2>
            <div className="pb-4 pl-4 pr-4">
                {renderTasks()}
            </div>
        </div>
    );
};

export default TaskList;
