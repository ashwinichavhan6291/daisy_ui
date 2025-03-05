import React, { useState } from "react";
import HomePage from "./components/HomePage";
import Header from "./components/Header";

import "react-toastify/dist/ReactToastify.css";


import "./App.css";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Login from "./components/Login";


function App() {
  let [showSignup, setShowSignup] = useState(false);
  let [showLogin, setShowLogin] = useState(false);

  return (
    <>
      
      <Header
        setShowSignup={setShowSignup}
        setShowLogin={setShowLogin}
        showLogin={showLogin}
        showSignup={showSignup}
      ></Header>
      <HomePage />

      {showSignup && <Signup />}
      {showLogin && <Login />}
   

      <Footer></Footer>
    </>
  );
}

export default App;
