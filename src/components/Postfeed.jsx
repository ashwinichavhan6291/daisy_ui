import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast,ToastContainer } from 'react-toastify';
import { ThumbsUp, ThumbsDown } from "lucide-react";



function Postfeed() {
let[post,setPost]=useState("");


    const handlePostfeeds=async()=>{
        try{
            const feeds=await axios.get("http://localhost:7777/postfeed",
                {withCredentials : true}
            )
            
            setPost(feeds.data);
           
        }
        catch(err){
            toast.error(err.response && err.response.data ? err.response.data.error : err.message );
        }
       
    }

    const handleLike=async(id)=>{
        try{
            const res=await axios.post(`http://localhost:7777/post/${id}/like`,{},
                {withCredentials:true}
            )
           
             handlePostfeeds()
        }
        catch(err){
            console.error(err.response && err.response.data ? err.response.data.error : err.message)
        }
       
    }
    const handleDislike=async(id)=>{
        try{
            const res=await axios.post(`http://localhost:7777/post/${id}/dislike`,{},
                {withCredentials:true}
            )
        
            handlePostfeeds()
          
        }
        catch(err){
            console.error(err.response && err.response.data ? err.response.data.error : err.message)
        }
      
    }
    useEffect(()=>{
        handlePostfeeds();
     
    },[])
 
  return (
    <>
     <div className="container mx-auto p-4">
      <ToastContainer/>
      {post.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-hidden">
          {[...post].reverse().map((post) => (
            <div key={post._id} className="card bg-base-100 shadow-xl">
              <figure>
                <img src={post.postImage} className="h-72 w-full object-cover" alt="Post" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{post.postTitle}</h2>
                <h3 className='font-semibold text-blue-600 hover:text-blue-700 cursor-pointer'>created By : {post.createdBy.firstName + " " + post.createdBy.lastName }</h3>
                <p className="overflow-auto break-words">{post.postContent}</p>
                <div className="card-actions flex justify-between items-center cursor-pointer">
                 
                    <div className={post.like ? "text-red-600" : "text-gray-600"}onClick={()=>handleLike(post._id)}>
                    <ThumbsUp />
                    <p>{post.like}</p>
                    </div>
                    
                  <div className={post.dislike && "text-blue-600"} onClick={()=>handleDislike(post._id)}>
                  <ThumbsDown />
                  <p>{post.dislike}</p>
                  </div>
                 </div>
                </div>
              </div>
            
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No posts available</p>
      )}
    </div>
    </>
  )
}

export default Postfeed