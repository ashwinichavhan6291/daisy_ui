import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slice/userslice'
import postReducer from '../slice/postSlice';
import getPostReducer from "../slice/getPostSlice"
import feedReducer from "../slice/feedSlice";
import requestReducer from '../slice/requestSlice';
import connectionReducer from '../slice/connection';
export const store=configureStore({
    reducer:{
       user: userReducer,
       post:postReducer,
       getPostData:getPostReducer,
       feed : feedReducer,
       request:requestReducer,
       connection:connectionReducer,
    }
})

