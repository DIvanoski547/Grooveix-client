import Navbar from "../components/Navbar";

function Homepage({ withNavbar }) {
  return (
    <div>
      {withNavbar && <Navbar />}
      <h1>Homepage</h1>
    </div>
  );
}

export default Homepage;
