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
    <>
    {/* <Navbar /> */}
    <form onSubmit={handleSubmit} className="signUpForm">
      <div>
        <h1>Sign up</h1>
        <label>First Name</label>
        <br />
        <input
          type="text"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
        />
        <br />
        <label>Last Name</label>
        <br />
        <input
          type="text"
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
        />
        <br />
        <label>Username</label>
        <br />
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
        />
        <br />
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
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit">
          Create the account
        </button>
        <br />
        <button>
          <Link to={"/"}>
            Back
          </Link>
        </button>
      </form>
    </>
  );
};
export default SignupPage;
