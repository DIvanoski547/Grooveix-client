import { AuthContext } from "../../context/auth.context";
import { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import avatarPng from "../../assets/avatar.png";

function ProfilePage() {
  const { user, setUser, isAdmin } = useContext(AuthContext);
  const [image, setImage] = useState("");
  // const [imageUpload, setImageUpload] = useState({});
  const [showUpload, setShowUpload] = useState(false);

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("profileImage", e.target.files[0]);
    axios.post("http://localhost:5005/api/profile/image-upload", uploadData)
      .then(response => {
      setImage(response.data.image)
    })
    // setImageUpload(uploadData);

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const responseCloudinaryUpload = await axios.post(
      "http://localhost:5005/users/profile/image-upload",
      image
    );
    const responseUserUpdate = await axios.put(
      "http://localhost:5005/users/profile",
      { ...user, profileImage: responseCloudinaryUpload.data.image }
    )
      .then(response => {
        setUser(response.data.updatedUser)
        setImage("")
    })

  //  setUser(responseUserUpdate.data.updatedUser);
  //  setShowUpload(false);
  };

  return (
    <div>
      <Navbar />
      <div>
        <p>{user.username}</p>
        <p>{user.firstName}</p>
        <p>{user.lastName}</p>

        {!isAdmin && user.profileImage ? (
          <img
            src={user.profileImage}
            alt={"profile_image"}
            style={{ width: "50px", height: "50px", borderRadius: "75%" }}
          />
        ) : (
          <img
            src={avatarPng}
            alt={"profile_image"}
            style={{ width: "50px", height: "50px", borderRadius: "75%" }}
          />
        )}
        {!showUpload && (
          <button onClick={() => setShowUpload(!showUpload)}>
            Change Profile Image
          </button>
        )}
      </div>
      <div>
        {showUpload && (
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={(e) => handleFileUpload(e)} />
            <button onClick={() => setShowUpload(!showUpload)}>
              Cancel change
            </button>
            <button type="submit">Save new profile image</button>
          </form>
        )}
      </div>
      <div>
        {isAdmin ? (
          <>
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
    </div>
  );
}

export default ProfilePage;
