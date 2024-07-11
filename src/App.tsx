import React from 'react';
import TaskBoard from './components/TaskBoard';
import TaskForm from './components/TaskForm';
import {useModal} from './hooks/useModal';

const App: React.FC = () => {
    const {isModalOpen, openModal, closeModal} = useModal();

    return (
        <div className="min-h-screen bg-gray-200 p-8">
            <button
                onClick={openModal}
                className="bg-green-500 text-white p-2 rounded mb-4"
            >
                &#43; Add Task
            </button>
            <TaskForm isOpen={isModalOpen} onClose={closeModal}/>
            <TaskBoard/>
        </div>
    );
};

export default App;
