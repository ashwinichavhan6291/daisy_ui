
const Profile = ({userData,profile}) => {
  
 
  return (
    <>
   {profile &&
      
        <div className="flex card bg-base-100 w-96 shadow-xl h-3/5">
          <figure className="px-10 pt-10">
           
              <img
                src={userData.photourl}
                alt="User Picture"
                className="rounded-xl h-64"
              />
            
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{userData.firstName} {userData.lastName}</h2>
            <p>{Array.isArray(userData.skills) ? userData.skills.join(", ") : userData.skills}</p>
            <p>{userData.age} {userData.gender}</p>
            
            <p>{userData.about}</p>

            
            
          </div>
        </div>
}
      
    </>
  );
};

export default Profile;
