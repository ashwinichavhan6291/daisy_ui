import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeFeed } from "../slice/feedSlice";
import { ToastContainer, toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Base_URL } from "../slice/constants";
import { Search} from "lucide-react";
import LoadSpinner from "./LoadSpinner";
import {handleRequest} from "../utils/Requests"
function UserCard() {
  let [currIndex, setCurrIndex] = useState(0);
  let[loader,setLoader]=useState(false);
  let[searchUser,setSearchUser]=useState("");
  const feeds = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const handleFeed = async () => {
    try {
setLoader(true);
      const res = await axios.get(Base_URL + "/feed", { withCredentials: true });
      dispatch(addFeed(res.data.data));
      setLoader(false);
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      setLoader(false);
    }
  };

  useEffect(() => {
    handleFeed();
  }, []);

  // const handleRequest = async (status, userId) => {
    
  //   handleUser(); 
  
  //   try {
  //     const res = await axios.post(
  //       `${Base_URL}/request/send/${status}/${userId}`,
  //       {},
  //       { headers: { "Content-Type": "application/json" }, withCredentials: true }
  //     );
  //     toast.success(res.data.message);
  //     dispatch(removeFeed(userId));
  //   } catch (err) {
  //     toast.error(
  //       err.response && err.response.data && err.response.data.error
  //         ? err.response.data.error
  //         : err.message,
  //       { autoClose: 2000,
  //         position:"top-center"
  //        }
  //     );
  //   }
  // };
  

  const handleUser = () => {
    setCurrIndex((prev) => (prev + 1) % feeds.length);
  };

  if (currIndex >= feeds.length)
    return <p className="text-center text-gray-500">No more users</p>;

  // const feed = feeds[currIndex];

  const filterFeeds=feeds.filter((feed)=>{
    return feed.firstName.toLowerCase().includes(searchUser.toLowerCase());
  })
  if(filterFeeds.length===0) return <p className="text-center mt-20 text-2xl font-bold">no such user found</p>
const feed=filterFeeds[currIndex];



  return (
    <>
<div className="relative">
  <Search className="absolute left-3 top-2 text-gray-400" />
  <input
    type="text"
    placeholder="Search..."
    value={searchUser}
    onChange={(e) => setSearchUser(e.target.value)}
    className="border border-gray-300 rounded-md px-3 py-2 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>



    {loader && <LoadSpinner/>}
      <ToastContainer />
      <div className="flex justify-center items-center min-h-screen px-4 bg-slate-600">
        <AnimatePresence mode="wait">
          <motion.div
            key={feed._id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-6 text-center max-w-md border border-gray-300"
          >
           
            <figure className="mb-4 ">
              <img
                src={feed.photourl}
                alt="User"
                className="rounded-xl h-64 object-cover w-full"
              />
            </figure>

           
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-gray-800">
                {feed.firstName} {feed.lastName}
              </h2>
              <p className="text-gray-600 font-medium">{feed.skills}</p>
              <p className="text-gray-500">
                {feed.gender} • {feed.age}
              </p>
              <p className="text-sm text-gray-500">{feed.about}</p>
            </div>

         
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-600 transition"
                onClick={() => handleRequest("interested", feed._id,dispatch)}
              >
                Interest
              </button>
              <button
                className="px-4 py-2 bg-pink-400 text-white rounded-lg hover:bg-pink-600 transition"
                onClick={() => handleRequest("ignored", feed._id, dispatch)}
              >
                Ignore
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                onClick={handleUser}
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

export default UserCard;

