import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addUser } from "../slice/userslice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Base_URL } from "../slice/constants";
import LoadSpinner from "./LoadSpinner";
import { FaWindowClose } from "react-icons/fa";
import {useNavigate } from "react-router-dom";

function Login({setshowHeaderbtn,close,setClose}) {
  const [newPassword, setNewPassword] = useState("");
  // const[login,setLogin]=useState(false);
  const [emailId, setEmailId] = useState("");
  const [passwordPage, setPasswordPage] = useState(false);

  const dispatch = useDispatch();
  const navigate=useNavigate();
  let[loader,setLoader]=useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
 


  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const handleLogin = async (data) => {
    
    setLoader(true)
    try {
      const response = await axios.post(Base_URL +"/login", data, {
        withCredentials: true,
      }); 

      dispatch(addUser(response.data));
      
     
      setEmailId(data.emailId);
      setValue("emailId", data.emailId);
      setLoader(false);
setshowHeaderbtn(true);
   
      setClose(true);
      setLoginSuccess(true);
  // navigate("/usercard");
    } catch (err) {
      toast.error(err.response?.data || err.message);
      setLoader(false)
    }
  
  };

  useEffect(()=>{
    if(loginSuccess){
      toast.success("Login successful!", { position: "top-right", autoClose: 1000 });
      setLoginSuccess(false);
    }
  },[loginSuccess])
  
  const handlePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(Base_URL+"/profile/password", { password: newPassword, emailId });
      toast.success(res.data);
      setNewPassword("");
    } catch (err) {
      toast.error(err.response?.data || err.message);
    }
  };

  return (
    <>
    
    {
      loader && <LoadSpinner/>
    }
    <ToastContainer />
    {(!close) &&
    (<div className="fixed inset-0 flex items-center justify-center bg-black-100 bg-opacity-50 z-50 p-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full ">
    <motion.form
      onSubmit={handleSubmit(handleLogin)}
      className="bg-black/30 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-lg w-11/12 max-w-md min-h-[350px] text-center "
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="realtive float-right mt-[-30px] mr-[-18px] w-3 h-6 cursor-pointer"
        onClick={() =>setClose(true)}
      >
           <FaWindowClose className=" bg-slate-200" />
           </div>
      <motion.h2
        className="text-white text-2xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {passwordPage ? "Reset Password" : "Log In"}
      </motion.h2>
  
      <AnimatePresence mode="wait">
        {!passwordPage ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4">
              <motion.input
                type="email"
                className="w-full px-4 py-2 rounded-md bg-white/20 text-white border border-white/30 placeholder-gray-200 focus:ring-2 focus:ring-indigo-300 outline-none"
                {...register("emailId", { required: "Email is required" })}
                value={emailId}
                onChange={(e) => { setEmailId(e.target.value); 
                  setValue("emailId", e.target.value); }}
                placeholder="Enter Email Address"
                whileFocus={{ scale: 1.05 }}
              />
              {errors.emailId && <p className="text-red-400 text-sm">{errors.emailId.message}</p>}
            </div>
  
            <div className="mb-6">
              <motion.input
                type="password"
                className="w-full px-4 py-2 rounded-md bg-white/20 text-white border border-white/30 placeholder-gray-200 focus:ring-2 focus:ring-indigo-300 outline-none"
                {...register("password", { required: "Password is required" })}
                placeholder="Enter Password"
                whileFocus={{ scale: 1.05 }}
              />
              {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
            </div>
  
            <motion.button
              type="submit"
              className="w-full bg-indigo-500 text-white font-bold py-2 rounded-md hover:bg-indigo-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Log In
            </motion.button>
  
            <p className="text-gray-200 mt-4">
              Forgot password?{" "}
              <motion.button
                className="text-indigo-700 underline"
                onClick={(e) => { e.preventDefault(); setPasswordPage(true); }}
                whileHover={{ scale: 1.1 }}
              >
                Click here
              </motion.button>
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="reset-password"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4">
              <input
                type="email"
                className="w-full px-4 py-2 rounded-md bg-white/20 text-white border border-white/30 placeholder-gray-200 focus:ring-2 focus:ring-indigo-300 outline-none"
                placeholder="Enter Email Address"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </div>
  
            <div className="mb-6">
              <motion.input
                type="password"
                className="w-full px-4 py-2 rounded-md bg-white/20 text-white border border-white/30 placeholder-gray-200 focus:ring-2 focus:ring-indigo-300 outline-none"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter New Password"
                whileFocus={{ scale: 1.05 }}
              />
            </div>
  
            <motion.button
              className="w-full bg-green-500 text-white font-bold py-2 rounded-md hover:bg-green-600 transition-all"
              onClick={handlePassword}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Reset Password
            </motion.button>
  
            <motion.button
              className="w-full mt-3 bg-gray-500 text-white font-bold py-2 rounded-md hover:bg-gray-600 transition-all"
              onClick={(e) => { e.preventDefault(); setPasswordPage(false); }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Login
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  </div>)

}
    </>
    
  );
}

export default Login;
