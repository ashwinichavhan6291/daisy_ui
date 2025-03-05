import React, { useState } from "react";
import { addUser } from "../slice/userslice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Profile from "./Profile";
import { ToastContainer, toast } from "react-toastify";
import { Base_URL } from "../slice/constants";

function ProfileEdit() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  let [firstName, setFirstName] = useState(user.firstName);
  let [lastName, setLastName] = useState(user.lastName);
  let [about, setAbout] = useState(user.about);
  let [gender, setGender] = useState(user.gender);
  let [age, setAge] = useState(user.age);
  let [photourl, setPhotourl] = useState(user.photourl);
  let [skills, setSkills] = useState(user.skills);
  let [profile, setProfile] = useState(true);

  const saveProfile = async () => {
    try {
      setProfile(false);
      const requestData = { firstName, lastName, gender, age, photourl, skills, about };

      const res = await axios.post(Base_URL + "/profile/edit", requestData, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      setProfile(true);
      toast.success(res.data.message);
      dispatch(addUser(res?.data?.data));
    } catch (err) {
      toast.error(err.response?.data?.error || err.message);
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="flex flex-col md:flex-row justify-center items-center max-h-screen px-4 py-6 md:px-10">
  <div className="card bg-base-content text-white w-full max-w-lg shadow-xl p-6 md:p-8 mx-auto">
    <div className="card-body">
      <h2 className="card-title text-center text-xl md:text-2xl">Edit Profile</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: "First Name", value: firstName, setter: setFirstName },
          { label: "Last Name", value: lastName, setter: setLastName },
          { label: "Skills", value: skills, setter: setSkills },
          { label: "Age", value: age, setter: setAge },
          { label: "Gender", value: gender, setter: setGender },
          { label: "About", value: about, setter: setAbout },
          { label: "Photo URL", value: photourl, setter: setPhotourl },
        ].map((field, index) => (
          <label key={index} className="form-control w-full">
            <div className="label">
              <span className="label-text text-white">{field.label}</span>
            </div>
            <input
              type="text"
              value={field.value || ""}
              className="input input-bordered w-full text-black"
              onChange={(e) => field.setter(e.target.value)}
            />
          </label>
        ))}
      </div>

      <div className="card-actions flex justify-center mt-6">
        <button className="btn btn-primary w-full md:w-auto px-6" onClick={saveProfile}>
          Save Profile
        </button>
      </div>
    </div>
  </div>
</div>



     
      <Profile userData={{ firstName, lastName, gender, age, photourl, skills, about }} profile={profile} />
    </>
  );
}

export default ProfileEdit;
