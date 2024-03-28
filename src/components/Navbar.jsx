import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Nav from 'react-bootstrap/Nav';


function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  return (
    <div className="py-3 nav-opacity">

      <nav className="">
<img src="./src/assets/logo-img.jpg" alt="" className="nav-logo"/>

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
            <button>Sign Up</button>{" "}
          </Link>
          <Link to="/login">
            {" "}
            <button>Login</button>{" "}
          </Link>
        </>
      )}
    </nav>  

      {/* <Nav className="justify-content-end" activeKey="/homepage">
        <Nav.Item>
          <Nav.Link href="/homepage">Home</Nav.Link>
        </Nav.Item>
        {isLoggedIn ? (
          <>
            <Nav.Item>
              <Nav.Link eventKey="link-1" href="/profile">Profile</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="link-2" href="/" onClick={logOutUser}>Logout</Nav.Link>
            </Nav.Item>
          </>
        ) : (
          <Nav.Item>
            <Nav.Link eventKey="link-2">Link</Nav.Link>
          </Nav.Item>
        )}
      </Nav> */}
    </div>
  );
}

export default Navbar;
