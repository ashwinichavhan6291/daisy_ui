import React, { useEffect} from 'react'

import { useDispatch, useSelector } from 'react-redux';
import {addData,removeData}  from '../slice/getPostSlice';
import axios from 'axios';
import { Base_URL } from '../slice/constants';




function Post() {

  const posts=useSelector((store)=>store.getPostData);
 
const dispatch=useDispatch();

  const getPost=async()=>{

    const res=await axios.get(Base_URL+"/getPost",{
      withCredentials:true
    });
 
    
    dispatch(addData(res.data))
   

  }

  const deletePost=async(_id)=>{
    if (!_id) {
      console.error("Error: No post ID provided");
      return;
    }
    try{
      const res=await axios.delete(`${Base_URL}/deletePost/${_id}`,
        {withCredentials:true}
      );
      
      dispatch(removeData({_id}));


    }
    catch(err){
      console.error("ERROR " , err.message);
      
    }
    


  }
  useEffect(()=>{
    getPost();
    deletePost();
  },[])
  
  return (
    <>
    {posts.length>0 ?  (
      posts.map((post)=> (
           <div key={post._id} className="card bg-base-100 w-96 shadow-xl"     style={{top: "100px" }}>
           <figure>
               <img
               src={post.postImage} style={{height: "300px",width:"100%"}}
               alt="Shoes" />
             </figure>
      <div className="card-body">
    <h2 className="card-title">{post.postTitle}</h2>
    <p style={{overflow:"auto",wordWrap: "break-word",overflowWrap:"break-word"}}>{post.postContent}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary" onClick={()=>deletePost(post._id)}>Delete Post</button>
    </div>
  </div>
</div>
      ))
    ) :   
     
    <p>No posts available</p>
     }
    
    
    </>
  )
}

export default Post