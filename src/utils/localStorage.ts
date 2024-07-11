import {RootState} from '../app/store';

export const saveToLocalStorage = (state: RootState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('tasksState', serializedState);
    } catch (e) {
        console.warn(e);
    }
};

export const loadFromLocalStorage = (): RootState | undefined => {
    try {
        const serializedState = localStorage.getItem('tasksState');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
};
