import { AuthContext } from "../../context/auth.context";
import { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import userService from "../../services/user.service";
import uploadService from "../../services/upload.service";

function ProfilePage() {
  const { user, setUser, isAdmin } = useContext(AuthContext);
  const [imageUpload, setImageUpload] = useState({});

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);
    setImageUpload(uploadData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const responseCloudinaryUpload = await axios.post(
      "http://localhost:5005/api/profile/image-upload",
      imageUpload
    );
    const responseUserUpdate = await axios.put(
      "http://localhost:5005/api/profile",
      { ...user, profileImage: responseCloudinaryUpload.data.image }
    );

    setUser(responseUserUpdate.data.updatedUser);
  };

  return (
    <div>
      <Navbar />
      <div >
            <p>{user.username}</p>
            <p>{user.firstName}</p>
            <p>{user.lastName}</p>
        <img src={user.profileImage} />
        
      </div>
      
      {isAdmin ? (
        <>
          <h1>im admin</h1>
          <button>
            <Link to="/all-users"> View all users</Link>
          </button>{" "}
          <button>
            <Link to="/albums"> View all albums</Link>
          </button>
        </>
      ) : (
        <>
            <h1>not admin</h1>
            
        </>
      )}
    </div>
  );
}

export default ProfilePage;
