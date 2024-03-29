import axios from "axios";
import { useState, useEffect } from "react";
import UserCard from "../components/UserCard";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import userService from "../services/users.service";
import Footer from "../components/Footer";

// const API_URI = "http://localhost:5005";

function AllUsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getUsers().then((response) => {
      console.log("users", response);
      setUsers(response);
    });
  }, []);

  return (
    <>
      <Navbar />
      <br />
      {users.map((user) => (
        <div className="album-card">
          <UserCard key={user._id} {...user} />
        </div>
      ))}
      <button>
        <Link to={"/profile"}>Back</Link>
      </button>
      <Footer />
    </>
  );
}

export default AllUsersPage;
