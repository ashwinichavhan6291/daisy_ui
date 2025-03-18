import React, { useState } from "react";
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Login from "./components/Login";
import "./App.css";

function App() {
  let [showSignup, setShowSignup] = useState(false);
  let [showLogin, setShowLogin] = useState(false);
    let[showHeaderbtn,setshowHeaderbtn]=useState(false);
    const[close,setClose]=useState(false);

  return (
    <>
   
      <Header
        setShowSignup={setShowSignup}
        setShowLogin={setShowLogin}
        showLogin={showLogin}
        showSignup={showSignup}
        showHeaderbtn={showHeaderbtn}
        setshowHeaderbtn={setshowHeaderbtn}
      />

      <HomePage 
      close={close}
      setClose={setClose}
      setshowHeaderbtn={setshowHeaderbtn} 
      
      
      />

      {showSignup && <Signup setshowHeaderbtn={setshowHeaderbtn} close={close} setClose={setClose}/>}
      
      {showLogin && <Login setshowHeaderbtn={setshowHeaderbtn} close={close} setClose={setClose}/>}
   

      <Footer/>
    </>
  );
}

export default App;
