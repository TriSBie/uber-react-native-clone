import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    origin: null,
    destination: null,
    travelTimeInformation: null
}
const navSlice = createSlice({
    name: 'nav',
    initialState: initialState,
    reducers: {
        setOrigin: (state, action) => {
            state.origin = action.payload;
        },
        setDestination: (state, action) => {
            state.destination = action.payload;
        },
        setTravelTimeInformation: (state, action) => {
            state.travelTimeInformation = action.payload;
        }
    }
})

export const selectOrigin = (state) => {
    return state.nav.origin;
}

export const selectDestination = (state) => {
    return state.nav.destination;
}

export const selectTravelTimeInformation = (state) => {
    return state.nav.travelTimeInformation;
}

export const { setOrigin, setDestination, setTravelTimeInformation } = navSlice.actions;
export default navSlice.reducer;