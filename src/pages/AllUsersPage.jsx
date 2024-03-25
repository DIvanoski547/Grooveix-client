import axios from "axios";
import { useState, useEffect } from "react";
import UserCard from "../components/UserCard";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const API_URI = "http://localhost:5005";

function AllUsersPage() {
  const [users, setUsers] = useState([]);
  const getUsers = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URI}/api/all-users`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUsers();
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
