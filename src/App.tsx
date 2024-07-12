import TaskBoard from './components/TaskBoard';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import {useModal} from './hooks/useModal';
import Button from './components/Button';

const App = () => {
    const {isModalOpen, openModal, closeModal} = useModal();

    return (
        <div className="min-h-screen bg-gray-200 p-8">
            <div className="flex flex-col items-center mb-4 lg:flex-row gap-4 max-w-[1440px] mx-auto px-4">
                <Button onClick={openModal} className="bg-green-500 text-white">
                    &#43; Add Task
                </Button>
                <TaskFilter/>
            </div>
            <TaskForm isOpen={isModalOpen} onClose={closeModal}/>
            <TaskBoard/>
        </div>
    );
};

export default App;
