import { Link } from "react-router-dom";

function StarterPage() {
  return (
    <>
      <img src="" alt="" />

      <Link to="/signup">
        <button>Signup</button>
      </Link>

      <Link to="/login">
        <button>Login</button>
      </Link>
    </>
  );
}

export default StarterPage;
