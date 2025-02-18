import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';  
import registrosReducer from "./registrosSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        registros: registrosReducer, 
    }
});

export default store;
