import { createSlice } from "@reduxjs/toolkit";
import { Car } from "../../models/car.model";

const favoriteSlice = createSlice({
    initialState: {
        favoriteCar: [] as Car[]
    },
    name: "favorite",
    reducers: {
        setFavoriteCar: (state, action) => {
            state.favoriteCar.push(action.payload)
        },
        deleteFavoriteCar: (state, action) => {
            state.favoriteCar = state.favoriteCar.filter(car => car.id !== action.payload)
        }
    }
})

export default favoriteSlice
export const { setFavoriteCar, deleteFavoriteCar } = favoriteSlice.actions