import React from 'react';
import {useTypedSelector} from '../hooks/useTypedSelector';
import Task from './Task';
import {TaskStatus} from '../constants';

interface TaskListProps {
    status: TaskStatus;
    onDrop: (e: React.DragEvent, status: TaskStatus) => void;
}

const TaskList: React.FC<TaskListProps> = ({status, onDrop}) => {
    const tasks = useTypedSelector(state => state.tasks.tasks);
    const filter = useTypedSelector(state => state.tasks.filter);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const filteredTasks = tasks.filter(task => {
        const matchAssignedTo = !filter?.assignedTo || (task.assignedTo && task.assignedTo === filter.assignedTo);
        const matchPriority = !filter?.priority || (task.priority && task.priority === filter.priority);
        const matchDueDate = !filter?.dueDate || (task.dueDate && task.dueDate === filter.dueDate);
        return task.status === status && matchAssignedTo && matchPriority && matchDueDate;
    });

    return (
        <div
            className="flex-1 bg-gray-100 rounded max-h-[80vh] overflow-y-auto"
            onDrop={(e) => {
                console.log('Drop event on:', status);
                onDrop(e, status);
            }}
            onDragOver={handleDragOver}
        >
            <h2 className="text-xl font-bold sticky top-0 bg-gray-100 w-full z-10 p-4">{status}</h2>
            <div className="pb-4 pl-4 pr-4">
                {filteredTasks.map(task => (
                    <Task key={task.id} task={task}/>
                ))}
            </div>
        </div>
    );
};

export default TaskList;
