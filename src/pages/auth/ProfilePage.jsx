import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

function ProfilePage() {
  const { user, isAdmin } = useContext(AuthContext);

  return (
    <div>
      <Navbar />

          {isAdmin ? <><h1>im admin</h1>
              {user.firstName} {user.lastName} <br/>
              {user.username}<br/>

              <button><Link to="/all-users"> View all users</Link></button>
              <button><Link to="/albums"> View all albums</Link></button>
              </> : <h1>not admin</h1>}
    </div>
  );
}

export default ProfilePage;
