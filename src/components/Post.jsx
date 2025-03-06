import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData, removeData } from "../slice/getPostSlice";
import axios from "axios";
import { Base_URL } from "../slice/constants";
import { toast, ToastContainer } from "react-toastify";


function Post() {
  const posts = useSelector((store) => store.getPostData);
  const dispatch = useDispatch();

  const getPost = async () => {
    try {
      const res = await axios.get(Base_URL + "/getPost", { withCredentials: true });
      dispatch(addData(res.data));
    } catch (err) {
      toast.error(
              err.response && err.response.data && err.response.data.error
                ? err.response.data.error
                : err.message,
              { autoClose: 2000,
                position:"top-center"
               }
            );
    }
  };

  const deletePost = async (_id) => {
    if (!_id) {
      console.error("Error: No post ID provided");
      return;
    }
    try {
      await axios.delete(`${Base_URL}/deletePost/${_id}`, { withCredentials: true });
      dispatch(removeData({ _id }));
    } catch (err) {
      console.error("ERROR ", err.message);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <ToastContainer/>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...posts].reverse().map((post) => (
            <div key={post._id} className="card bg-base-100 shadow-xl">
              <figure>
                <img src={post.postImage} className="h-72 w-full object-cover" alt="Post" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{post.postTitle}</h2>
                <p className="overflow-auto break-words">{post.postContent}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary" onClick={() => deletePost(post._id)}>
                    Delete Post
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No posts available</p>
      )}
    </div>
  );
}

export default Post;
