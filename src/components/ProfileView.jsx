import React, { useState,useEffect} from 'react'
import axios from 'axios';
import { toast ,ToastContainer} from 'react-toastify';
import { Base_URL } from '../slice/constants';

function ProfileView() {

  let[profile,setProfile]=useState("");
  const fetchProfile=async()=>{
    try{

      const res=await axios.get(Base_URL+"/profile/view",
        {withCredentials:true}
      )
      setProfile(res.data);
     
    }
    catch(err){
     
    toast.error( err.response && err.response.data && err.response.data.error
      ? err.response.data.error
      : err.message,{ autoClose: 1000 }
  )
    }
  }
useEffect(()=>{
  fetchProfile();
},[])
  
  return (
  <>
  <ToastContainer/>
  {profile &&     
    (  <div className="card bg-neutral text-neutral-content w-96 left-96 top-2 ">
  <div className="card-body items-center text-center">
    <figure >
      <img className='h-48 w-48' src={profile.photourl} alt="" />
    </figure>
    <h2 className="card-title">{profile.firstName + " " + profile.lastName}</h2>
    <h3>{profile.age + " " + profile.gender}</h3>
    <h3>{profile.about}</h3>
    
  </div>
</div>)      }
 
  </>
  )
}

export default ProfileView;