import React, {useState} from 'react';
import TaskBoard from './components/TaskBoard';
import AddTaskForm from './components/AddTaskForm';

const App: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="min-h-screen bg-gray-200 p-8">
            <button
                onClick={openModal}
                className="bg-green-500 text-white p-2 rounded mb-4"
            >
                &#43; Add Task
            </button>
            <AddTaskForm isOpen={isModalOpen} onClose={closeModal}/>
            <TaskBoard/>
        </div>
    );
};

export default App;
