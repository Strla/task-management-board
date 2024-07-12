import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {setFilter} from '../features/tasks/tasksSlice';
import {Priority, USERS} from '../constants';
import Button from './Button';

interface Filters {
    assignedTo: string;
    priority: string;
    dueDate: string;
}

const TaskFilter = () => {
    const [filters, setFilters] = useState<Filters>({assignedTo: '', priority: '', dueDate: ''});
    const dispatch = useDispatch();

    useEffect(() => {
        const storedFilters = JSON.parse(localStorage.getItem('taskFilters') || '{}');
        setFilters(storedFilters);
        dispatch(setFilter(storedFilters));
    }, [dispatch]);

    const handleFilterChange = () => {
        dispatch(setFilter(filters));
        localStorage.setItem('taskFilters', JSON.stringify(filters));
    };

    const handleResetFilter = () => {
        const resetFilters = {assignedTo: '', priority: '', dueDate: ''};
        setFilters(resetFilters);
        dispatch(setFilter(resetFilters));
        localStorage.removeItem('taskFilters');
    };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const {name, value} = e.target;
        setFilters({...filters, [name]: value});
    };

    return (
        <div
            className="flex flex-col justify-between gap-4 lg:flex-row mx-auto items-center px-4 py-2 bg-white rounded shadow-sm">
            <div className="flex items-center space-x-2">
                <label className="text-gray-700">Assigned To</label>
                <select
                    name="assignedTo"
                    value={filters.assignedTo}
                    onChange={handleChange}
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
                    name="priority"
                    value={filters.priority}
                    onChange={handleChange}
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
                    name="dueDate"
                    value={filters.dueDate}
                    onChange={handleChange}
                    className="p-1 border border-gray-300 rounded"
                />
            </div>
            <div className="flex gap-4">
                <Button onClick={handleFilterChange} className="bg-blue-500 text-white hover:bg-blue-600">
                    Apply
                </Button>
                <Button onClick={handleResetFilter} className="bg-gray-200 text-black hover:bg-gray-300">
                    Reset
                </Button>
            </div>
        </div>
    );
};

export default TaskFilter;
