import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, removeRequest } from '../slice/requestSlice';
import { toast ,ToastContainer} from 'react-toastify';
import axios from 'axios';
import { Base_URL } from '../slice/constants';


function Requests() {

  const requests=useSelector((store)=>store.request);
  
  const dispatch=useDispatch();

  const viewRequest=async()=>{
    try{

      const res=await axios.get(`${Base_URL}/user/request/received` ,
      
        {withCredentials :true}
      )
dispatch(addRequest(res.data.data));


      }
    
    catch(err){
      toast.error( err.response && err.response.data && err.response.data.error
                  ? err.response.data.error
                  : err.message
              );
    }
  }

  const handleRequests = async (status, _id) => {
    try {
    
    
      const res = await axios.post(
        `${Base_URL}/request/review/${status}/${_id}`,
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );
  
      dispatch(removeRequest(_id));
     
    } catch (err) {
       toast.error( err.response && err.response.data && err.response.data.error
                  ? err.response.data.error
                  : err.message
              )
    }
  };
  
  useEffect(()=>{
   viewRequest();
   
  },[])

  
  return (
    <>

   <ToastContainer/>
  
      {requests.length == 0
       ?
      (
       <>
       <h1>No Requests Found</h1><div className="flex justify-center my-20">
            <div className="card glass w-96 bg-slate-400">
              <figure>
                <img
                  src="https://t3.ftcdn.net/jpg/09/20/34/14/360_F_920341426_YC1FssYYEPqHIOFfGtclqnznTt1xMbT6.jpg"
                  alt="car!" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">No Request Found</h2>
              </div>
            </div>

          </div>
          </>
       )
      
    :

(requests.map((req)=> 
  
{const{_id,firstName,lastName,skills,age,about,photourl,gender}=req.fromUserId;

return(
<div className="flex card bg-base-100 w-96 shadow-xl h-3/5" key={_id}>
          <figure className="px-10 pt-10">
           
              <img
                src={photourl}
                alt="User Picture"
                className="rounded-xl h-64"
              />
            
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{firstName + " " + lastName}</h2>
            <p>{skills}</p>
            <p>{about}</p>
            
            <p>{age} {gender}</p>

            <div className='m-5 font-semibold  ' >
              <button className='btn  bg-pink-400 mr-10' onClick={()=>handleRequests("accepted",req._id)}>Accept</button>
              <button className='btn bg-pink-400' onClick={()=>handleRequests("rejected",req._id)}>Reject</button>
            </div>
            
          </div>
        </div>
)

}
)

)
}

    </>
  )
}

export default Requests