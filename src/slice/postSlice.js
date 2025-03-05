import { createSlice } from "@reduxjs/toolkit";

export const  postSlice=createSlice({
    name:"posts",
    initialState:[],
    reducers :{
        addPost:(state,action)=>{
             state.push(action.payload);
        },
        removePost:(state,action)=>{
            return null;
        }
    }
})
export const{addPost,removePost}=postSlice.actions;

export default postSlice. reducer;
