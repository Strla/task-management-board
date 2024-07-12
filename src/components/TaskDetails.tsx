import React from 'react';
import {Task} from '../features/tasks/taskTypes';
import Modal from './Modal';
import {format} from 'date-fns';

interface TaskDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    task: Task;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({isOpen, onClose, task}) => {
    const formattedDueDate = task.dueDate ? format(new Date(task.dueDate), 'MMMM dd, yyyy') : null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-3xl font-bold mb-4 text-blue-600">Task Details</h2>
            <div className="space-y-3">
                <p className="text-lg"><strong>Title:</strong> {task.title}</p>
                <p className="text-lg"><strong>Description:</strong> {task.description}</p>
                {formattedDueDate && (
                    <p className="text-lg"><strong>Due Date:</strong> {formattedDueDate}</p>
                )}
                {task.priority && (
                    <p className="text-lg">
                        <strong>Priority:</strong> <span
                        className={`font-semibold ${task.priority === 'High' ? 'text-red-500' : task.priority === 'Medium' ? 'text-yellow-500' : 'text-green-500'}`}>{task.priority}</span>
                    </p>
                )}
                {task.assignedTo && (
                    <p className="text-lg"><strong>Assigned To:</strong> {task.assignedTo}</p>
                )}
            </div>
            <div className="mt-6 text-right">
                <button onClick={onClose}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Close
                </button>
            </div>
        </Modal>
    );
};

export default TaskDetails;
