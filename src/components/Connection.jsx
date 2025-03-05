import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addConnection } from '../slice/connection';
import { toast ,ToastContainer} from 'react-toastify';
import { Base_URL } from '../slice/constants';


function Connection() {
  

  const connections=useSelector((store)=>store.connection);
  
  const dispatch=useDispatch();
  const fetchConnection=async()=>{
    try{
   const res=await axios.get(Base_URL+"/user/connections",
    {withCredentials :true}
   );
   dispatch(addConnection(res.data.data))
   
    }
    catch(err){
      toast.error( err.response && err.response.data && err.response.data.error
                       ? err.response.data.error
                       : err.message
                   );
    }
  }

  useEffect(()=>{
    fetchConnection();
  },[])
  

  return (
    <>
    <ToastContainer/>
      {!connections || connections.length === 0 ? (
        <div className="flex card bg-base-100 w-96 shadow-xl h-3/5">
          <h2 className='text-2xl font-extralight'>No connection found</h2>
          <figure className="px-10 pt-10">
            <img
              src="https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg"
              alt="No connections"
              className="rounded-xl h-64"
            />
          </figure>
        </div>
      ) : (
        connections.map((con) => {
        

          return (
            <div className="flex card bg-base-100 w-96 shadow-xl h-3/5" key={con._id}>
              <figure className="px-10 pt-10">
                <img src={con.photourl} alt="User Picture" className="rounded-xl h-64" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{con.firstName + " " + con.lastName}</h2>
                <p>{con.skills}</p>
                <p>{con.about}</p>
                <p>{con.age} {con.gender}</p>
              </div>
            </div>
          );
        })
      )}
    </>
  );
}

export default Connection;

  
    

   
  


