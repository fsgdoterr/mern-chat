import { configureStore } from "@reduxjs/toolkit";
import rootSlice from "./slices/rootSlice";
import modalSlice from "./slices/modalSlice";


const store = configureStore({
    reducer: {
        root: rootSlice,
        modals: modalSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;