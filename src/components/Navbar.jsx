import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Nav from 'react-bootstrap/Nav';


function Navbar() {
  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);
  return (
    <nav>
      <Link to="/homepage">
        <button>Home</button>
      </Link>

      {isLoggedIn ? (
        <>
          <Link to="/profile">
            {" "}
            <button>Profile</button>{" "}
          </Link>
          <button onClick={logOutUser}>
            <Link to="/">Logout</Link>
          </button>
        </>
      ) : (
        <>
          <Link to="/signup">
            {" "}
            <button>Sign Up</button>{" "}
          </Link>
          <Link to="/login">
            {" "}
            <button>Login</button>{" "}
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
