import { createSlice } from '@reduxjs/toolkit';


const storedUser = JSON.parse(localStorage.getItem("user")) || null;

export const userSlice = createSlice({
    name: 'user',
    initialState: { userData: storedUser},
    reducers: {
        addUser: (state, action) => {
            state.userData = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        removeUser: (state) => {
            state.userData = null;
            localStorage.removeItem("user"); 
        }
    }
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
