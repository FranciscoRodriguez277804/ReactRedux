import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null, password: null , isAuthenticated: false},
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.usuario;
            state.token = action.payload.token;
            state.password = action.payload.password;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        }
    }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
