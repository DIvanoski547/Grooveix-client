import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);
  return (
    <nav className="p-3 mb-3 border-bottom">
      <div className="container">
        <div d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start>
          <a href="/homepage" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
            <svg className="bi me-2"></svg>
          </a>
          <div>
            <NavLink to="/homepage">
              <button>Home</button>
            </NavLink>

            {isLoggedIn ? (
              <>
                <NavLink to="/profile">
                  {" "}
                  <button>Profile</button>{" "}
                </NavLink>

                <NavLink to="/">
                  <button onClick={logOutUser}>Logout</button>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/signup">
                  {" "}
                  <button>Sign Up</button>{" "}
                </NavLink>
                <NavLink to="/login">
                  {" "}
                  <button>Login</button>{" "}
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
