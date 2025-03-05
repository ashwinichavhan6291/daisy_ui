
import React, { useState } from 'react'
import { addUser } from '../slice/userslice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Profile from './Profile';
import { ToastContainer, toast } from "react-toastify";
import { Base_URL } from '../slice/constants';



function ProfileEdit() {
  const user=useSelector((store)=>store.user);

    const dispatch=useDispatch();
   let[firstName,setFirstName]=useState(user.firstName);
   let[lastName,setLastName]=useState(user.lastName);
   let[about,setAbout]=useState(user.about);
   let[gender,setGender]=useState(user.gender);
   let[age,setAge]=useState(user.age);
   let[photourl,setPhotourl]=useState(user.photourl);
   let[skills,setSkills]=useState(user.skiils);
   let[profile,setProfile]=useState(true);


   
    const saveProfile=async()=>{
  
     try{
      setProfile(false);
      const requestData={firstName,lastName,gender,age,photourl,skills,about}
      
      const res=await axios.post(Base_URL+"/profile/edit", 
     requestData,
     { 
      withCredentials: true, 
      headers: { "Content-Type": "application/json" } 
    }
      );
      
      setProfile(true);
            toast.success(res.data.message);
         dispatch(addUser(res?.data?.data));
        
        }
        catch(err){
            toast.error(err.response && err.response.data &&err.response.data.error ? err.response.data : err.message);
        }
      
    }
    
 
   
  return (
    <>
    <ToastContainer/>


<div className=" h-300 flex justify-center">
      <div className="flex justify-center mx-10 ">
        <div className="card bg-base-content text-white w-96 shadow-xl ">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <div>
              <label className="form-control w-full max-w-xs my-2">
                <div className="label ">
                  <span className="label-text text-white">FirstName</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered w-full max-w-xs text-black"
                  onChange={(e)=>setFirstName(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs my-2">
                <div className="label ">
                  <span className="label-text text-white">LastName</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered w-full max-w-xs text-black"
                  onChange={(e)=>setLastName(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs my-2">
                <div className="label ">
                  <span className="label-text text-white">Skills</span>
                </div>
                <input
                  type="text"
                  value={skills}
                  className="input input-bordered w-full max-w-xs text-black"
                 onChange={(e)=>setSkills(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs my-2">
                <div className="label ">
                  <span className="label-text text-white">Age</span>
                </div>
                <input
                  type="text"
                  value={age}
                  className="input input-bordered w-full max-w-xs text-black"
                  onChange={(e)=>setAge(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs my-2">
                <div className="label ">
                  <span className="label-text text-white">Gender</span>
                </div>
                <input
                  type="text"
                  value={gender}
                  className="input input-bordered w-full max-w-xs text-black"
                 onChange={(e)=>setGender(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs my-2">
                <div className="label ">
                  <span className="label-text text-white">About</span>
                </div>
                <input
                  type="text"
                  value={about}
                  className="input input-bordered w-full max-w-xs text-black"
                onChange={(e)=>setAbout(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs my-2">
                <div className="label ">
                  <span className="label-text text-white">Photo Url</span>
                </div>
                
                <input
                  type="text"
                  value={photourl || ""}
                  className="input input-bordered w-full max-w-xs text-black"
                  onChange={(e) => setPhotourl(e.target.value)}
                />
              </label>
            </div>
            
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={()=>saveProfile()}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      
      </div>
    
    <Profile userData={{firstName,lastName,gender,age,photourl,skills,about}}  profile={profile}/>
    </>
  )
}

export default ProfileEdit;


  
   