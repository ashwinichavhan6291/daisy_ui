import React from "react";
import { motion } from "framer-motion";

function Header({ setShowSignup, setShowLogin, showLogin, showSignup }) {
  return (
    <>
      <motion.div
        className="navbar bg-neutral text-neutral-content"
        style={{ position: "fixed", zIndex: "1", width: "100%" }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease:"easeOut" }}
      >
        <motion.button
          className="btn btn-ghost text-xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          📜 Posts
        </motion.button>

        <div className="listContainer flex justify-between items-center list-none ml-auto">
          <motion.button
            className="btn m-1 rounded-badge mr-10"
            onClick={() => setShowLogin(!showLogin)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Log In
          </motion.button>

          <motion.button
            className="btn m-1 rounded-badge mr-10"
            onClick={() => setShowSignup(!showSignup)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Sign Up
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}

export default Header;
