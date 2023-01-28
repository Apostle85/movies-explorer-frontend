import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";

import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { useState } from "react";
import { SavedMoviesContext, UserContext } from "../../utils/contexts";

function App() {
  const location = useLocation();
  const [savedMovies, setSavedMovies] = useState([]);
  const [isFound, setIsFound] = useState(true);
  const onOpen = () => setIsFound(false);
  const onClose = () => setIsFound(true);

  return (
    <div
      className={`App ${
        location.pathname === "/" ||
        location.pathname === "/movies" ||
        location.pathname === "/saved-movies" ||
        location.pathname === "/profile"
          ? "App_color_light"
          : ""
      }`}
    >
      <div className="page">
        {isFound &&
          location.pathname !== "/signup" &&
          location.pathname !== "/signin" && <Header />}
        <UserContext.Provider value={{ name: "", email: "" }}>
          <SavedMoviesContext.Provider value={{ savedMovies, setSavedMovies }}>
            <Routes>
              <Route exact path="/" element={<Main />} />
              <Route exact path="/movies" element={<Movies />} />
              <Route exact path="/saved-movies" element={<SavedMovies />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/signup" element={<Register />} />
              <Route exact path="/signin" element={<Login />} />
              <Route
                path="*"
                element={<NotFoundPage onOpen={onOpen} onClose={onClose} />}
              />
            </Routes>
          </SavedMoviesContext.Provider>
        </UserContext.Provider>
        {isFound &&
          location.pathname !== "/signup" &&
          location.pathname !== "/signin" &&
          location.pathname !== "/profile" && <Footer />}
      </div>
    </div>
  );
}

export default App;
