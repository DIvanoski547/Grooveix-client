import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
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
            <Link to="/homepage">Logout</Link>
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
