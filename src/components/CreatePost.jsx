import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addPost } from "../slice/postSlice";
import { useNavigate } from "react-router-dom";
import { Base_URL } from "../slice/constants";

function CreatePost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let [postTitle, setPostTitle] = useState("");
  let [postContent, setPostContent] = useState("");
  let [postImage, setPostImage] = useState("");

  const createPost = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        Base_URL + "/post",
        { postTitle, postImage, postContent },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      dispatch(addPost(response.data));
      toast.success("Post created successfully!");
      setPostTitle("");
      setPostContent("");
      setPostImage("");
      navigate("/post");
    } catch (err) {
      toast.error(err.response?.data?.error || err.message);
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="flex justify-center items-center min-h-screen bg-slate-600 p-6">
        <div className="bg-white shadow-lg rounded-lg 
                        w-[90%] xs:w-[90%] sm:w-[80%] md:w-[75%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]
                        max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl 
                        p-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-6">
            Create a Post
          </h2>

          <form onSubmit={createPost} className="flex flex-col gap-6">
            {/* Post Title */}
            <div>
              <label className="text-gray-700 font-medium block mb-1">Post Title</label>
              <input
                type="text"
                value={postTitle}
                className="input input-bordered w-full text-black"
                onChange={(e) => setPostTitle(e.target.value)}
              />
            </div>

            {/* Post Image */}
            <div>
              <label className="text-gray-700 font-medium block mb-1">Image URL</label>
              <input
                type="text"
                value={postImage}
                className="input input-bordered w-full text-black"
                onChange={(e) => setPostImage(e.target.value)}
              />
            </div>

            {/* Post Content */}
            <div>
              <label className="text-gray-700 font-medium block mb-1">Post Content</label>
              <textarea
                value={postContent}
                className="textarea textarea-bordered w-full text-black"
                onChange={(e) => setPostContent(e.target.value)}
              />
              {postContent.length > 100 && (
                <p className="text-red-600 font-semibold mt-2">
                  Text length should not be more than 100
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              className="btn btn-primary w-full md:w-1/2 mx-auto bg-teal-600 text-white py-2 px-6 rounded-lg"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
