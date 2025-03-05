import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed, removeFeed } from '../slice/feedSlice';
import { ToastContainer, toast } from "react-toastify";
import { motion, AnimatePresence } from 'framer-motion';
import { Base_URL } from '../slice/constants';

function UserCard() {
    let [currIndex, setCurrIndex] = useState(0);
    const feeds = useSelector((store) => store.feed);
    const dispatch = useDispatch();

    const handleFeed = async () => {
        try {
            const res = await axios.get(Base_URL+"/feed", { withCredentials: true });
            dispatch(addFeed(res.data.data));
            console.log(res.data.data);
        } catch (err) {
            console.error(err.response ? err.response.data : err.message);
        }
    };

    useEffect(() => {
        handleFeed();
    }, []);

    const handleRequest = async (status, userId) => {
        try {
            const res = await axios.post(
                `${Base_URL}/request/send/${status}/${userId}`,
                {},
                { headers: { "Content-Type": "application/json" }, withCredentials: true }
            );
            toast.success(res.data.message);
            dispatch(removeFeed(userId));
        } catch (err) {
            toast.error(err.response && err.response.data && err.response.data.error ? err.response.data.error : err.message);
        }
    };

    const handleUser = () => {
        setCurrIndex((prev) => (prev + 1) % feeds.length);
    };

    if (currIndex >= feeds.length) return <p className="text-center text-gray-500">No more users</p>;
    const feed = feeds[currIndex];

    return (
        <>
            <ToastContainer />
            <div className="flex justify-center items-center h-screen ml-64">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={feed._id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-2xl shadow-lg p-6 text-center w-96 border border-gray-300"
                    >
                        <figure className="mb-4">
                            <img src={feed.photourl} alt="User Picture" className="rounded-xl h-64 object-cover w-full" />
                        </figure>
                        <div className="space-y-2">
                            <h2 className="text-xl font-bold text-gray-800">{feed.firstName} {feed.lastName}</h2>
                            <p className="text-gray-600 font-medium">{feed.skills}</p>
                            <p className="text-gray-500">{feed.gender} • {feed.age}</p>
                            <p className="text-sm text-gray-500">{feed.about}</p>
                        </div>
                        <div className='mt-4 flex space-x-4'>
                            <button className='px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-600 transition' onClick={() => handleRequest("interested", feed._id)}>Interest</button>
                            <button className='px-4 py-2 bg-pink-400 text-white rounded-lg hover:bg-pink-600 transition' onClick={() => handleRequest("ignored", feed._id)}>Ignore</button>
                            <button className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition' onClick={handleUser}>Next</button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </>
    );
}

export default UserCard;