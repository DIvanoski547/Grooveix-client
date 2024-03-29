import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);
  return (

    <div className="py-1 nav-opacity">

    <nav>

<img src="../src/assets/logo-img.jpg" alt="logo-img" className="nav-logo me-5"/>

        <Link to="/homepage">
          <button className="btn-nav">Home</button>
        </Link>

        {isLoggedIn ? (
          <>
            <Link to="/profile">
              {" "}
              <button className="btn-nav">Profile</button>{" "}
            </Link>

            <Link to="/">
              <button onClick={logOutUser} className="btn-nav">
                Logout
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/signup">
              {" "}
              <button className="btn-nav">Sign Up</button>{" "}
            </Link>
            <Link to="/login">
              {" "}
              <button className="btn-nav">Login</button>{" "}
            </Link>
          </>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
