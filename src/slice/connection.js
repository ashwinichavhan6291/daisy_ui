import { createSlice } from "@reduxjs/toolkit";

export const connectionSlice=createSlice({
    name: "connect",
    initialState:[],
    reducers:{
        addConnection:(state,action)=>{
            return action.payload;
        }
    }
})
export const{addConnection}=connectionSlice.actions;
export default connectionSlice.reducer;