import React from 'react';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {TaskStatus} from '../features/tasks/taskTypes';
import Task from './Task';

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
                <Task key={task.id} id={task.id} title={task.title} description={task.description}/>
            ));

    return (
        <div
            className="flex-1 bg-gray-100 p-4 rounded"
            onDrop={(e) => onDrop(e, status)}
            onDragOver={handleDragOver}
        >
            <h2 className="text-xl font-bold mb-4">{status}</h2>
            {renderTasks()}
        </div>
    );
};

export default TaskList;