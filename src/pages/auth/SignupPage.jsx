import React from "react";
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../../services/auth.service";
import { AuthContext } from "../../context/auth.context";
import Navbar from "../../components/Navbar";

const SignupPage = () => {
  // set states
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(undefined);

  // set function for handling changes in form's inputs
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  // set function for handling submission of data
  const handleSubmit = (e) => {
    e.preventDefault();
    authService
      .signup(user)

      .then(() => navigate("/login"))
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="bg-lila">
      <div className="wrap-container">
        <div className="wrap">
          <form onSubmit={handleSubmit} className="signUpForm">
            <div className="">
              <h1 className="text-light">
                {" "}
                <b> Create account</b>
              </h1>

              <input
                className="form-control my-3"
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                placeholder="First Name"
              />

              <input
                className="form-control mb-3"
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                placeholder="Last Name"
              />

              <input
                className="form-control mb-3"
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                placeholder="Username"
              />

              <input
                className="form-control mb-3"
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="user@email.com"
              />

              <input
                className="form-control"
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="**********"
              />
            </div>
            {errorMessage && (
              <p className="error-message text-danger mt-3">{errorMessage}</p>
            )}

            <button type="submit" className="btn-magenta m-3">
              Sign Up
            </button>
            <br />

            <Link to={"/"}>
              {" "}
              <button className="btn-magenta">Back</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignupPage;
