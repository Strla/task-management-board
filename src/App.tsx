import React from 'react';
import TaskBoard from './components/TaskBoard';

const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-200 p-8">
            <TaskBoard/>
        </div>
    );
};

export default App;
