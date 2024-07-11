import {combineReducers, configureStore} from '@reduxjs/toolkit';
import tasksReducer from '../features/tasks/tasksSlice';
import draggingReducer from '../features/dragging/draggingSlice';
import {loadFromLocalStorage, saveToLocalStorage} from '../utils/localStorage';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    dragging: draggingReducer,
});

const store = configureStore({
    reducer: rootReducer,
    preloadedState: loadFromLocalStorage(),
});

store.subscribe(() => saveToLocalStorage(store.getState()));

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;
