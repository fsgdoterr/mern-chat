import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum MODALS {
    ACCOUNT = 'account',
    UPDATE_USER = 'update-user',
    CHANGE_PASSWORD = 'change-password',
}

interface ModalSlice {
    modals: MODALS[];
}

const initialState: ModalSlice = {
    modals: [],
}

const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        openModal(initialState, action: PayloadAction<MODALS>) {
            initialState.modals = [...new Set([...initialState.modals, action.payload])];
        },
        closeModal(initialState) {
            initialState.modals = initialState.modals.slice(0, -1);
        },
        closeAllModals(initialState) {
            initialState.modals = [];
        }
    }
});

export const {
    openModal,
    closeModal,
    closeAllModals
} = modalsSlice.actions;

export default modalsSlice.reducer;