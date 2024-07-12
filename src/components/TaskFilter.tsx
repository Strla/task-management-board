import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {setFilter} from '../features/tasks/tasksSlice';
import {Priority, USERS} from '../constants';

const TaskFilter = () => {
    const [assignedTo, setAssignedToFilter] = useState<string>('');
    const [priority, setPriorityFilter] = useState<string>('');
    const [dueDate, setDueDateFilter] = useState<string>('');
    const dispatch = useDispatch();

    useEffect(() => {
        const storedFilters = JSON.parse(localStorage.getItem('taskFilters') || '{}');
        if (storedFilters.assignedTo) setAssignedToFilter(storedFilters.assignedTo);
        if (storedFilters.priority) setPriorityFilter(storedFilters.priority);
        if (storedFilters.dueDate) setDueDateFilter(storedFilters.dueDate);

        dispatch(setFilter(storedFilters));
    }, [dispatch]);

    const handleFilterChange = () => {
        const filters = {assignedTo, priority, dueDate};
        dispatch(setFilter(filters));
        localStorage.setItem('taskFilters', JSON.stringify(filters));
    };

    const handleResetFilter = () => {
        setAssignedToFilter('');
        setPriorityFilter('');
        setDueDateFilter('');
        dispatch(setFilter({assignedTo: '', priority: '', dueDate: ''}));
        localStorage.removeItem('taskFilters');
    };

    return (
        <div className="flex mx-auto items-center space-x-4 px-4 py-2 bg-white rounded shadow-sm justify-between">
            <div className="flex items-center space-x-2">
                <label className="text-gray-700">Assigned To</label>
                <select
                    value={assignedTo}
                    onChange={(e) => setAssignedToFilter(e.target.value)}
                    className="p-1 border border-gray-300 rounded"
                >
                    <option value="">All</option>
                    {USERS.map(user => (
                        <option key={user} value={user}>{user}</option>
                    ))}
                </select>
            </div>
            <div className="flex items-center space-x-2">
                <label className="text-gray-700">Priority</label>
                <select
                    value={priority}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="p-1 border border-gray-300 rounded"
                >
                    <option value="">All</option>
                    <option value={Priority.LOW}>Low</option>
                    <option value={Priority.MEDIUM}>Medium</option>
                    <option value={Priority.HIGH}>High</option>
                </select>
            </div>
            <div className="flex items-center space-x-2">
                <label className="text-gray-700">Due Date</label>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDateFilter(e.target.value)}
                    className="p-1 border border-gray-300 rounded"
                />
            </div>
            <div className="flex gap-4">
                <button
                    onClick={handleFilterChange}
                    className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition duration-200"
                >
                    Apply
                </button>
                <button
                    onClick={handleResetFilter}
                    className="bg-gray-200 text-black px-3 py-2 rounded hover:bg-gray-300 transition duration-200"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default TaskFilter;
