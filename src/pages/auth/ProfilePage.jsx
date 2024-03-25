import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

function ProfilePage() {
  const { user, isAdmin } = useContext(AuthContext);

  return (
    <div>
      <Navbar />

      {isAdmin ? (
        <>
          <h4>im admin</h4>
          <p>Firstname: {user.firstName}</p>
          <p>Lastname: {user.lastName}</p>
          <p>Username: {user.username}</p>
          <button>
            <Link to="/all-users"> View all users</Link>
          </button>{" "}
          <button>
            <Link to="/albums"> View all albums</Link>
          </button>
        </>
      ) : (
        <h1>not admin</h1>
      )}
    </div>
  );
}

export default ProfilePage;
