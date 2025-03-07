import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../slice/userslice";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import { Base_URL } from "../slice/constants";
import LoadSpinner from "./LoadSpinner";
import { FaWindowClose } from "react-icons/fa";

const Signup = () => {
  
  let[loader,setLoader]=useState(false);
  let[isOpen,setIsOpen]=useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleOnSubmit = async (formData) => {
    try {
      setLoader(true);
      const res = await axios.post( Base_URL+"/signup", formData, {
        withCredentials:true,
      });
      dispatch(addUser(res.data));
      toast.success(res.data);
      
      setLoader(false);
      
    } catch (err) {
      toast.error(err.response ? err.response.data : err.message);
      setLoader(false);
    }
  
  };

  return (
    <>
      {loader && <LoadSpinner/>}

      {!isOpen &&
    <div className="fixed inset-0 flex items-center justify-center bg-black-100 bg-opacity-50 z-50 p-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">


 
{/* </div> */}
  <motion.form
    onSubmit={handleSubmit(handleOnSubmit )}
    className="bg-black/30 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-lg w-11/12 max-w-md min-h-[350px] text-center"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div
  className="realtive float-right mt-[-30px] mr-[-18px] w-3 h-6 cursor-pointer"
  onClick={() => setIsOpen(true)}
>
     <FaWindowClose className=" bg-slate-200" />
     </div>
    <h2 className="text-white text-2xl font-bold mb-6">Sign Up</h2>

    <div className="mb-4">
      <input
        type="text"
        className="w-full px-4 py-2 rounded-md bg-white/20 text-white border border-white/30 placeholder-gray-200 focus:ring-2 focus:ring-indigo-300 outline-none"
        {...register("firstName", { required: "First Name is required", minLength: { value: 4, message: "At least 4 characters" } })}
        placeholder="Enter First Name"
      />
      {errors.firstName && <p className="text-red-400 text-sm">{errors.firstName.message}</p>}
    </div>

    <div className="mb-4">
      <input
        type="text"
        className="w-full px-4 py-2 rounded-md bg-white/20 text-white border border-white/30 placeholder-gray-200 focus:ring-2 focus:ring-indigo-300 outline-none"
        {...register("lastName", { required: "Last Name is required", minLength: { value: 4, message: "At least 4 characters" } })}
        placeholder="Enter Last Name"
      />
      {errors.lastName && <p className="text-red-400 text-sm">{errors.lastName.message}</p>}
    </div>

    <div className="mb-4">
      <input
        type="email"
        className="w-full px-4 py-2 rounded-md bg-white/20 text-white border border-white/30 placeholder-gray-200 focus:ring-2 focus:ring-indigo-300 outline-none"
        {...register("emailId", { required: "Email is required", pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "Invalid email format" } })}
        placeholder="Enter Email"
      />
      {errors.emailId && <p className="text-red-400 text-sm">{errors.emailId.message}</p>}
    </div>

    <div className="mb-6">
      <input
        type="password"
        className="w-full px-4 py-2 rounded-md bg-white/20 text-white border border-white/30 placeholder-gray-200 focus:ring-2 focus:ring-indigo-300 outline-none"
        {...register("password", {
          required: "Password is required",
          minLength: { value: 8, message: "At least 8 characters" },
          pattern: { value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, message: "Must contain uppercase, number, and special character" },
        })}
        placeholder="Enter Password"
      />
      {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
    </div>

    <motion.button
      type="submit"
      className="w-full bg-indigo-500 text-white font-bold py-2 rounded-md hover:bg-indigo-600 transition-all"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Sign Up
    </motion.button>
  </motion.form>
</div>
}

    </>
  
  );
};

export default Signup;
