import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import StarterPage from "./pages/StarterPage";

function App() {
  return (
    <div>

      <Routes>
      <Route exact path="/" element={<StarterPage />} />
       <Route exact path="/login" element={<LoginPage withNavbar={true} />} />
       <Route exact path="/signup" element={<SignupPage withNavbar={true} />} />
       <Route exact path="/homepage" element={<Homepage withNavbar={true} />} />
      </Routes>
    </div>
  );
}

export default App;
