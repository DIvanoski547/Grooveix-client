import { AuthContext } from "../../context/auth.context";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import avatarPng from "../../assets/avatar.png";
import userService from "../../services/user.service";

function ProfilePage() {
  const { user, setUser, isAdmin } = useContext(AuthContext);
  const [profileImage, setProfileImage] = useState("");
  const [showUpload, setShowUpload] = useState(false);

  // ******** this method handles the file upload ********
  const handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("profileImage", e.target.files[0]);

    userService
      .uploadProfileImage(uploadData)
      .then((response) => {
        console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setProfileImage(response.profileImageUrl);
      })
      .then(() => {
        console.log("updated file", profileImage);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  // ********  this method submits the form ********
  const handleSubmit = (e) => {
    e.preventDefault();

    userService
      .updateProfile({ profileImage })
      .then((res) => {
        const updatedUser = res.updatedUser;
        console.log("updated user", res.updatedUser);
        console.log("res.data", res.updatedUser);
        setUser(updatedUser);
        setProfileImage("");
        setShowUpload(false);
      })
      .catch((err) => console.log("Error while updating profile: ", err));
  };

  return (
    <div>
      <Navbar />
      <div>
        <p>{user.username}</p>
        <p>{user.firstName}</p>
        <p>{user.lastName}</p>

        {!isAdmin && !showUpload && (
          <>
            <img
              src={user.profileImage}
              alt={"profile_image"}
              style={{ width: "100px", height: "100px", borderRadius: "75%" }}
            />

            <button onClick={() => setShowUpload(!showUpload)}>
              Change Profile Image
            </button>
          </>
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
