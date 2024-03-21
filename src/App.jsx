import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";


function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Homepage/>}/>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default App;
