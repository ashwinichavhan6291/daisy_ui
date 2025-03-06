import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Base_URL } from "../slice/constants";
import LoadSpinner from "./LoadSpinner";

function ProfileView() {
  const [profile, setProfile] = useState("");
  let[loader,setLoader]=useState(false);

  const fetchProfile = async () => {
    try {
      setLoader(true);
      const res = await axios.get(Base_URL + "/profile/view", {
        withCredentials: true,
      });
      setProfile(res.data);
      setLoader(false);
    } catch (err) {
      console.error(err.response && err.response.data && err.response.data.error
        ? err.response.data.error
        : err.message);
      toast.error(
        err.response && err.response.data && err.response.data.error
          ? err.response.data.error
          : err.message,
        { autoClose: 2000,
          position:"top-center"
         }
      );
    }
    setLoader(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
    {loader && <LoadSpinner/>}
      <ToastContainer />
      {profile && (
        <div className="card bg-neutral text-neutral-content max-w-xs w-full mx-auto p-4 mt-40">
          <div className="card-body items-center text-center">
            <figure>
              <img className="h-32 w-32 rounded-full" src={profile.photourl} alt="Profile" />
            </figure>
            <h2 className="card-title text-lg font-bold">{profile.firstName + " " + profile.lastName}</h2>
            <h3 className="text-sm">{profile.age + " • " + profile.gender}</h3>
            <p className="text-sm text-center">{profile.about}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileView;
