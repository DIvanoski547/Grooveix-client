import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";
import Navbar from "../../components/Navbar";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const LoginPage = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const requestBody = {email, password}
    authService
      .login(user)
      .then((response) => {
        // store the token in localStorage
        console.log("token", response.data.authToken);
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/homepage");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };
  return (
    <div className="bg-lila">
      <div className="wrap-container">
        <div className="wrap">
          <form onSubmit={handleSubmit} className="loginForm">
            <div>
              <h1><b> Login</b> </h1>
              <div className="my-3">
                <input
                  className="form-control border-dark-subtle mb-2"
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="user@email.com"
                />
              </div>

              <div>
                <input
                  className="form-control  border-dark-subtle mb-2"
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="***********"
                />
              </div>
            </div>
            {errorMessage && (
              <p className="error-message text-danger mt-3">{errorMessage}</p>
            )}
            <button type="submit" className="btn-magenta m-3">
              Login
            </button>
            <br />

            <Link to={"/"}>
              <button className="btn-magenta">Back </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
