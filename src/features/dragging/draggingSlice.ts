import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface DraggingState {
    draggingItemId: string | null;
}

const initialState: DraggingState = {
    draggingItemId: null,
};

const draggingSlice = createSlice({
    name: 'dragging',
    initialState,
    reducers: {
        setDraggingItemId(state, action: PayloadAction<string | null>) {
            state.draggingItemId = action.payload;
        },
    },
});

export const {setDraggingItemId} = draggingSlice.actions;
export default draggingSlice.reducer;
