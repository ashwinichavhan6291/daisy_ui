import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';


function Chat() {
  const userdata=useSelector((store)=>
   
  store.user.userData);

  const userId=userdata?.data.user._id;
 
  const{targetUserId}=useParams();

  const[message,setMessage]=useState([]);
  const[newMessage,setNewMessage]=useState("");



  
  
  
  useEffect(()=>{
    const socket=createSocketConnection();

    socket.emit("joinchat",{firstName: userdata.data.user.firstName ,userId,targetUserId})
    socket.on("receivedMessage", ({ firstName, text }) => {
      console.log(firstName + " : " + text);
      setMessage((message)=>[...message,{firstName, text}])
    });
    return()=>{
  socket.disconnect();
    }
  },[userId])

  const sendMessage=()=>{
    const socket=createSocketConnection();
    socket.emit("sendMessage",{firstName: userdata.data.user.firstName,
      userId,
      targetUserId ,
      text:newMessage}); 
  }

  return (
    <>
   <div className="flex flex-col border border-gray-700 bg-black text-white p-6 mx-auto my-10 h-[70vh] w-[50vw] rounded-lg shadow-lg">

  <h1 className="p-4 text-lg font-semibold text-center border-b border-gray-600">
    Chat
  </h1>


  <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-600">
    {message.map((msg, index) => (
      <div key={index} className="flex flex-col items-start space-y-1">
        <span className="text-xs opacity-50">{msg.firstName}</span>
        <div className="bg-gray-800 p-3 rounded-lg max-w-[75%] shadow-md">
          {msg.text}
        </div>
        <span className="text-xs opacity-50">Just now</span>
      </div>
    ))}
  </div>

  <div className="flex items-center gap-3 p-4 border-t border-gray-600 bg-gray-900">
    <input
      type="text" value={newMessage}
      placeholder="Enter your message..."
      className="flex-1 bg-gray-800 text-white p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={(e)=>setNewMessage(e.target.value)}
    />
    <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 transition-all shadow-md" onClick={sendMessage}>
      Send
    </button>
  </div>
</div>


    </>
  )
}

export default Chat