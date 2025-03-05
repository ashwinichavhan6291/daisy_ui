import { createSlice } from "@reduxjs/toolkit";

export const requestSlice=createSlice({
    name: "request",
    initialState:[],
    reducers:{
        addRequest:(state,action)=>{
            return action.payload;
        },
        removeRequest:(state,action)=>{
            const removeRequest=state.filter((req)=>req._id!==action.payload);
            return removeRequest;
        }
    }
})

export const{addRequest,removeRequest}=requestSlice.actions;
export default requestSlice.reducer;