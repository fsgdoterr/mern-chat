import IUser from "../../interfaces/models/IUser";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RootSlice {
    user?: IUser;
}

const initialState: RootSlice = {
    user: undefined,
}

const rootSlice = createSlice({
    name: 'root',
    initialState,
    reducers: {
        setUser(initialState, action: PayloadAction<IUser | undefined>) {
            initialState.user = action.payload;
        }
    }
});

export const {
    setUser,
} = rootSlice.actions;

export default rootSlice.reducer;