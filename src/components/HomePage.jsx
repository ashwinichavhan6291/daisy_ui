import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import { Base_URL } from "../slice/constants";
import { FiMenu, FiX } from "react-icons/fi";

function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await axios.post(Base_URL + "/logout", {}, { withCredentials: true });
      toast.success(res.data);
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col md:flex-row min-h-screen relative">

        {/* Sidebar Background Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 md:hidden transition-opacity"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Mobile Sidebar Toggle Button */}
        <button
          className="absolute top-4 left-4 z-50 text-white md:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <FiMenu size={30} />
        </button>

        {/* Sidebar */}
        <motion.div
          className={`fixed md:relative top-0 left-0 h-screen bg-gray-900 p-5 pt-8 w-64 z-50 transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          {/* Close Button (Mobile Only) */}
          <button
            className="absolute top-4 right-4 text-white md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <FiX size={30} />
          </button>

          <ul className="mt-10 text-white text-center md:text-left">
            {[
              { name: "Profile", path: "/profileview" },
              { name: "Edit Profile", path: "/profile" },
              { name: "Posts", path: "/post" },
              { name: "Create Post", path: "/createpost" },
              { name: "Users", path: "/usercard" },
              { name: "Requests", path: "/request" },
              { name: "Connections", path: "/connection" },
            ].map((item, index) => (
              <motion.li
                key={index}
                className="mt-4 md:mt-10 hover:text-blue-400"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to={item.path}
                  onClick={() => setSidebarOpen(false)} // Closes sidebar when clicking a link
                >
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </ul>

          
          <motion.div
            className="mt-5 md:absolute md:bottom-5 md:left-5 flex justify-center md:justify-start text-white"
            whileHover={{ scale: 1.1 }}
          >
            <button className="btn btn-ghost transition-all" onClick={handleLogout}>
              Logout
            </button>
          </motion.div>
        </motion.div>

        
        <motion.div
          className="hero bg-slate-200 flex flex-col md:flex-row min-h-screen items-center p-5 md:p-10 gap-5 md:gap-10 w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
         
          <div className="hero-content text-center md:text-left w-full md:w-1/2">
            <h1 className="text-3xl md:text-5xl font-bold text-black">
              Let's create something amazing
            </h1>
            <p className="py-4 md:py-6 text-lg md:text-3xl">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis aliquid officia repellendus adipisci assumenda maiores ducimus placeat modi error aut.
            </p>

      
            <motion.div whileHover={{ scale: 1.1 }}>
              <Link to="/signup" className="btn btn-primary bg-blue-500 hover:bg-green-500 text-black px-6 py-3 rounded-md">
                Get Started
              </Link>
            </motion.div>
          </div>

          
          <div className="w-full md:w-1/3 flex justify-center">
            <motion.img
              src="https://images.pexels.com/photos/4348078/pexels-photo-4348078.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="post"
              className="w-full max-w-sm md:max-w-md rounded-md"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            />
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default HomePage;
