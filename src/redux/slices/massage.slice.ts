import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const massageSlice = createSlice({
    initialState: {
        message:""
    },
    name: "massage",
    reducers: {
         setMessage: (state, action: PayloadAction<string>) => {
           state.message=action.payload
        
        },
    }
})

export default massageSlice
export const { setMessage} = massageSlice.actions