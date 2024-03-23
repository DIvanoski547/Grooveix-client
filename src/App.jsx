import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
// import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import StarterPage from "./pages/StarterPage";
import AlbumDetailPage from "./pages/AlbumDetailsPage";
import AlbumsListPage from "./pages/AlbumsListPage";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<StarterPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignupPage />} />
        <Route exact path="/homepage" element={<Homepage />} />
        <Route exact path="/albums" element={<AlbumsListPage />} />
        <Route exact path="/albums/:albumId" element={<AlbumDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
