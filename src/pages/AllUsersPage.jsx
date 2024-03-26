import axios from "axios";
import { useState, useEffect } from "react";
import UserCard from "../components/UserCard";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import userService from "../services/user.service";

// const API_URI = "http://localhost:5005";

function AllUsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
      userService.getUsers()
          .then((response) => {
          setUsers(response.data)
      })
  }, []);

  return (
    <>
      <Navbar />
      <br />
      {users.map((user) => (
        <UserCard key={user._id} {...user} />
      ))}
      <button>
          <Link to={"/profile"}>
            Back
          </Link>
        </button>
    </>
  );
}

export default AllUsersPage;
