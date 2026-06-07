import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/user.model";

interface UserState {
    user: User | null;
}

const initialState: UserState = {
    user: null 
};

const userSlice = createSlice({
    name: "user",
    initialState, 
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        }
    }
});

export default userSlice;
export const { setUser, clearUser } = userSlice.actions;