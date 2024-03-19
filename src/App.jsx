import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";


function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default App;
