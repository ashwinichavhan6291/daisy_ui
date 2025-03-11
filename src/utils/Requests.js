import axios from "axios";
import { toast } from "react-toastify";

import { Base_URL } from "../slice/constants";
import { removeFeed } from "../slice/feedSlice";


export const handleRequest = async (status, userId,dispatch) => {
    
  // handleUser(); 

  try {
    const res = await axios.post(
      `${Base_URL}/request/send/${status}/${userId}`,
      {},
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    toast.success(res.data.message);

    console.log("data " , res.data);
    
    dispatch(removeFeed(userId));
  } catch (err) {
   
  const errorMessage =
        typeof err.response?.data === "string"
            ? err.response.data
            : err.response?.data?.error || "Something went wrong";

    toast.error(errorMessage, {
        autoClose: 2000,
        position: "top-center"
    });
  }
};