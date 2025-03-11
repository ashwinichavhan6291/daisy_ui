import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";


import { toast, ToastContainer } from "react-toastify";
import { handleRequest} from "../utils/Requests";
import LoadSpinner from "./LoadSpinner";

function Userprofile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(false);
  
  const dispatch=useDispatch();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:7777/profile/${userId}`, {
          withCredentials: true,
        });
        console.log(res.data);
        console.log("id" , res.data._id);
        setUser(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  if (!user) {
    return <p>Loading user profile...</p>;
  }

  return (
    <>
      {loader && <LoadSpinner />}
      <ToastContainer />
      <div className="flex justify-center items-center min-h-screen px-4 bg-slate-600">
        <AnimatePresence mode="wait">
          <motion.div
            key={user._id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-6 text-center max-w-md border border-gray-300"
          >
            <figure className="mb-4 ">
              <img
                src={user.photourl}
                alt="User"
                className="rounded-xl h-64 object-cover w-full"
              />
            </figure>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-gray-800">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-600 font-medium">{user.skills}</p>
              <p className="text-gray-500">
                {user.gender} • {user.age}
              </p>
              <p className="text-sm text-gray-500">{user.about}</p>
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-600 transition"
                onClick={() => {
                  handleRequest("interested", user._id,dispatch);
                }}
              >
                Interest
              </button>
              <button
                className="px-4 py-2 bg-pink-400 text-white rounded-lg hover:bg-pink-600 transition"
                onClick={() => handleRequest("ignored", user._id,dispatch)}
              >
                Ignore
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
               
              >
                Next
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

export default Userprofile;
