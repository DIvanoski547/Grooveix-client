import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>

      <Link to="/signup">
        {" "}
        <button>Sign Up</button>{" "}
      </Link>
      <Link to="/login">
        {" "}
        <button>Login</button>{" "}
      </Link>
      {isLoggedIn && (
        <>
          <button onClick={logOutUser}>Logout</button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
