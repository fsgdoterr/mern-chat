import { configureStore } from "@reduxjs/toolkit";
import rootSlice from "./slices/rootSlice";


const store = configureStore({
    reducer: {
        root: rootSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;