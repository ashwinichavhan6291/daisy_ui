
const Profile = ({userData,profile}) => {
  
 
  return (
    <>
   {profile &&
      
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="card bg-base-100 w-full max-w-md shadow-xl p-4 md:p-6">
      <figure className="px-6 pt-6 flex justify-center items-center">
  <img
    src={userData.photourl}
    alt="User Picture"
    className="rounded-xl w-50 h-50 object-cover"
  />
</figure>
<div className="card-body items-center text-center text-xl" >
          <h2 className="card-title text-lg md:text-xl font-semibold">
            {userData.firstName} {userData.lastName}
          </h2>
          <p className="text-lg md:text-base text-black font-semibold">
            {Array.isArray(userData.skills) ? userData.skills.join(", ") : userData.skills}
          </p>
          <p className="text-lg text-black-500 font-semibold">
            {userData.age  + ", " + userData.gender}
          </p>
          <p className="text-lg md:text-base text-black mt-2">
            {userData.about}
          </p>
        </div>
      </div>
    </div>
    
}
      
    </>
  );
};

export default Profile;
