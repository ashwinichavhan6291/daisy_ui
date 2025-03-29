import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addConnection } from "../slice/connection";
import { toast, ToastContainer } from "react-toastify";
import { Base_URL } from "../slice/constants";
import LoadSpinner from "./LoadSpinner";
import { Link } from "react-router-dom";

function Connection() {
  let[loader,setLoader]=useState(false);
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchConnection = async () => {
    try {
      setLoader(true);
      const res = await axios.get(Base_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
      setLoader(false);
    } catch (err) {
      toast.error(
        err.response && err.response.data && err.response.data.error
          ? err.response.data.error
          : err.message,
        { autoClose: 2000, position: "top-center" }
      );
    }
    setLoader(false);
  };

  useEffect(() => {
    fetchConnection();
  }, []);

  return (
    <>
      <ToastContainer />
      {loader && <LoadSpinner/>}
      {!connections || connections.length === 0 ? (
        <div className="flex flex-col items-center card bg-base-100 w-96 shadow-xl p-10">
          <h2 className="text-2xl font-light">No connection found</h2>
          <figure className="px-10 pt-6">
            <img
              src="https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg"
              alt="No connections"
              className="rounded-xl h-48 object-cover"
            />
          </figure>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-center gap-6">
            {[...connections].reverse().map((con) => (
              <div
                className="card bg-base-100 shadow-xl w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
                key={con._id}
              >
                <figure className="px-6 pt-6">
                  <img
                    src={con.photourl}
                    alt="User"
                    className="rounded-xl h-48 object-cover w-full"
                  />
                </figure>
                <div className="card-body text-center">
                  <h2 className="card-title">
                    {con.firstName + " " + con.lastName}
                  </h2>
                  <p>{con.skills}</p>
                  <p>{con.about}</p>
                  <p>
                    {con.age} {con.gender}
                  </p>
                  
                </div>
              </div>
            ))}
          </div>
          
        </div>
      )}
    </>
  );
}

export default Connection;
