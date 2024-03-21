import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";

const LoginPage = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    authService
      .login(user)
      .then((tokenObject) => {
        // store the token in localStorage
        console.log("token", tokenObject.authToken)
        storeToken(tokenObject.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((err) => console.error(err));
  };
  return (
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

          <button type="submit">
            <b>Login</b>
          </button>
    </form>
  );
};

export default LoginPage;
