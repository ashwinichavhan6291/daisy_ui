import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Base_URL } from '../slice/constants';

function HomePage() {
  const handleLogout = async () => {
    try {
      const res = await axios.post(
        Base_URL +"/logout",
        {},
        { withCredentials: true }
      );
      toast.success(res.data);
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <motion.div
        className="flex h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Sidebar */}
        <motion.div
          className="w-64"
          initial={{ x: -100 }}
          animate={{ x: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="bg-gray-900 h-screen p-5 pt-8 relative transition-all duration-300">
          <ul className="mt-20 text-white ml-7">
  {[
    { name: "Profile", path: "/profileview" },
    { name: "Edit Profile", path: "/profile" },
    { name: "Posts", path: "/post" },
    { name: "Create Post", path: "/createpost" },
    { name: "Users", path: "/usercard" },
    { name: "Requests", path: "/request" },
    { name: "Connections", path: "/connection" }
  ].map((item, index) => (
    <motion.li
      key={index}
      className="mt-10 hover:text-blue-400"
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link to={item.path}>{item.name}</Link>
    </motion.li>
  ))}
</ul>



            <motion.div
              className="absolute bottom-5 left-5 flex items-center text-white cursor-pointer"
              whileHover={{ scale: 1.1 }}
            >
              <button className="btn btn-ghost ml-4 transition-all" onClick={handleLogout}>
                Logout
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          className="hero bg-slate-200 flex h-screen gap-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-content text-center">
            <div className="">
              <h1 className="text-5xl font-bold text-black">Let's create something amazing</h1>
              <p className="py-6 text-3xl">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis aliquid officia repellendus adipisci assumenda maiores ducimus placeat modi error aut.
              </p>

              <motion.div whileHover={{ scale: 1.1 }}>
                <Link to="/signup" className="btn btn-primary bg-blue-500 hover:bg-green-500 text-black">
                  Get Started
                </Link>
              </motion.div>
            </div>
          </div>

          <motion.img
            src="https://images.pexels.com/photos/4348078/pexels-photo-4348078.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="post"
            className="w-1/3 ml-auto rounded-md"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>
      </motion.div>
    </>
  );
}

export default HomePage;
