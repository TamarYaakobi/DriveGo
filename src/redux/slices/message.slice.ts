import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    initialState: {
        message: "",
        type: ''
    },
    name: "message",
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload.message
            state.type = action.payload.type
        },
    }
})

export default messageSlice
export const { setMessage } = messageSlice.actions