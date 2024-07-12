import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ModalState {
    isEditModalOpen: boolean;
    isDetailsModalOpen: boolean;
    isConfirmModalOpen: boolean;
    taskId: string | null;
}

const initialState: ModalState = {
    isEditModalOpen: false,
    isDetailsModalOpen: false,
    isConfirmModalOpen: false,
    taskId: null,
};

const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        openEditModal(state, action: PayloadAction<string>) {
            state.isEditModalOpen = true;
            state.taskId = action.payload;
        },
        closeEditModal(state) {
            state.isEditModalOpen = false;
            state.taskId = null;
        },
        openDetailsModal(state, action: PayloadAction<string>) {
            state.isDetailsModalOpen = true;
            state.taskId = action.payload;
        },
        closeDetailsModal(state) {
            state.isDetailsModalOpen = false;
            state.taskId = null;
        },
        openConfirmModal(state, action: PayloadAction<string>) {
            state.isConfirmModalOpen = true;
            state.taskId = action.payload;
        },
        closeConfirmModal(state) {
            state.isConfirmModalOpen = false;
            state.taskId = null;
        },
    },
});

export const {
    openEditModal,
    closeEditModal,
    openDetailsModal,
    closeDetailsModal,
    openConfirmModal,
    closeConfirmModal,
} = modalsSlice.actions;

export default modalsSlice.reducer;
