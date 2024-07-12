import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Task as TaskType} from '../features/tasks/taskTypes';
import {useDrag} from '../hooks/useDrag';
import {
    closeConfirmModal,
    closeDetailsModal,
    closeEditModal,
    openConfirmModal,
    openDetailsModal,
    openEditModal
} from '../features/modals/modalsSlice';
import TaskDetailsModal from './TaskDetails';
import TaskForm from './TaskForm';
import ConfirmationModal from './ConfirmationModal';
import {RootState} from '../app/store';
import {deleteTask} from "../features/tasks/tasksActions";
import Button from './Button';

interface TaskProps {
    task: TaskType;
}

const Task = React.memo(({task}: TaskProps) => {
    const dispatch = useDispatch();
    const {startDrag, endDrag} = useDrag();
    const modals = useSelector((state: RootState) => state.modals);

    const handleDragStart = () => {
        startDrag(task.id);
    };

    const handleDragEnd = () => {
        endDrag();
    };

    const handleDelete = () => {
        dispatch(deleteTask(task.id));
        dispatch(closeConfirmModal());
    };

    return (
        <>
            <div
                draggable
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                className="bg-white p-4 rounded shadow mb-4"
            >
                <h3 className="font-bold cursor-pointer" onClick={() => dispatch(openDetailsModal(task.id))}>
                    {task.title}
                </h3>
                <p>{task.description}</p>
                <div className="mt-2 flex justify-end space-x-2">
                    <Button onClick={() => dispatch(openEditModal(task.id))}
                            className="text-blue-500 shadow-sm bg-gray-50">
                        Edit
                    </Button>
                    <Button onClick={() => dispatch(openConfirmModal(task.id))}
                            className="text-red-500 shadow-sm bg-gray-50">
                        Delete
                    </Button>
                </div>
            </div>
            {modals.isEditModalOpen && modals.taskId === task.id && (
                <TaskForm isOpen={modals.isEditModalOpen} onClose={() => dispatch(closeEditModal())} task={task}/>
            )}
            {modals.isDetailsModalOpen && modals.taskId === task.id && (
                <TaskDetailsModal isOpen={modals.isDetailsModalOpen} onClose={() => dispatch(closeDetailsModal())}
                                  task={task}/>
            )}
            {modals.isConfirmModalOpen && modals.taskId === task.id && (
                <ConfirmationModal
                    isOpen={modals.isConfirmModalOpen}
                    onClose={() => dispatch(closeConfirmModal())}
                    onConfirm={handleDelete}
                    title="Confirm Deletion"
                    message="Are you sure you want to delete this task?"
                />
            )}
        </>
    );
});

export default Task;
