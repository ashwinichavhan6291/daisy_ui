import React, { useState } from "react";
import { motion } from "framer-motion";

function Header({ setShowSignup, setShowLogin, showLogin, showSignup,showHeaderbtn }) {

  return (
    <motion.div
      className="navbar bg-neutral text-neutral-content flex flex-wrap justify-between items-center p-4 fixed w-full z-10"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
     
      <motion.button
        className="btn btn-ghost text-xl left-10 top-9"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        📜 Posts
      </motion.button>
      {!showHeaderbtn && 
       <div className="flex gap-3 ml-auto">
      
        <motion.button
          className="btn btn-sm rounded-badge"
          onClick={() => setShowLogin(!showLogin)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Log In
        </motion.button>

        <motion.button
          className="btn btn-sm rounded-badge"
          onClick={() => setShowSignup(!showSignup)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Sign Up
        </motion.button>

      </div>
}
    </motion.div>
  );
}

export default Header;
