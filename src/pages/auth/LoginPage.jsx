import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";
import Navbar from "../../components/Navbar";

const LoginPage = ({ withNavbar }) => {
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
    <>
      {/* <Navbar /> */}
      <form onSubmit={handleSubmit} className="loginForm">
        <div>
          <h1>Login</h1>
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          <br />
          <label>Password</label>
          <br />
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          <br />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Login</button>
        <br />

        <Link to={"/"}>
          <button>Back </button>
        </Link>
      </form>
    </>
  );
};

export default LoginPage;
