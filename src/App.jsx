import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import Homepage from "./pages/Homepage";
import StarterPage from "./pages/StarterPage";
import AlbumsListPage from "./pages/AlbumsListPage";
import AlbumDetailsPage from "./pages/AlbumDetailsPage";
import AlbumCreatePage from "./pages/AlbumCreatePage";
import ArtistDetailsPage from "./pages/ArtistDetailsPage";
import ProfilePage from "./pages/auth/ProfilePage";
import AllUsersPage from "./pages/AllUsersPage";
import AlbumEditPage from "./pages/AlbumEditPage";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<StarterPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignupPage />} />
        <Route exact path="/homepage" element={<Homepage />} />
        <Route exact path="/albums" element={<AlbumsListPage />} />
        <Route exact path="/albums/:albumId" element={<AlbumDetailsPage />} />
        <Route
          exact
          path="/albums/create-album"
          element={<AlbumCreatePage />}
        />
        <Route exact path="/albums/edit/:albumId" element={<AlbumEditPage />} />
        <Route exact path="/profile" element={<ProfilePage />} />
        <Route
          exact
          path="/artists/:artistId"
          element={<ArtistDetailsPage />}
        />
        <Route exact path="/all-users" element={<AllUsersPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
