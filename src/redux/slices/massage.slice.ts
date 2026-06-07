import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const massageSlice = createSlice({
    initialState: {
        message:"",
        type: ''
    },
    name: "massage",
    reducers: {
         setMessage: (state, action) => {
           state.message=action.payload.massage
           state.type=action.payload.type
        },
    }
})

export default massageSlice
export const { setMessage} = massageSlice.actions