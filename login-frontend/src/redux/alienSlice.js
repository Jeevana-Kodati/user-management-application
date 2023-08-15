import { createSlice } from '@reduxjs/toolkit';

const alienSlice = createSlice(
    {
        name: "alien",
        initialState: {
            id: "",
            username: "",
            role: [],
            token: "",
        },
        reducers: {
            fetching: (state, action) => {
                state.username = action.payload.username;
                state.role = action.payload.role;
                state.id = action.payload.id;
                state.token = action.payload.token;
            },
            logout: (state) => {
                state.username = "";
                state.role = [];
                state.id = "";
                state.token = "";
            }
        }
    }
)

export default alienSlice.reducer;
export const { fetching, logout } = alienSlice.actions;