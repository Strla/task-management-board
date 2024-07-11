import {RootState} from '../app/store';
import {TASKS_STORAGE_KEY} from "../constants";

export const saveToLocalStorage = (state: RootState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(TASKS_STORAGE_KEY, serializedState);
    } catch (e) {
        console.warn(e);
    }
};

export const loadFromLocalStorage = (): RootState | undefined => {
    try {
        const serializedState = localStorage.getItem(TASKS_STORAGE_KEY);
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
};
