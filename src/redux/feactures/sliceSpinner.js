import { createSlice } from "@reduxjs/toolkit";
const initialState = false;
const sliceSpinner = createSlice({
    name:"spinner",
    initialState,
    reducers: {
        setCargando:(state,action) => {
            const cargando = action.payload;
            return cargando;
        }
    }


});
export const {setCargando} = 
    sliceSpinner.actions;
export default sliceSpinner.reducer;