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
import { useEffect, useState } from "react";
import {
  MoviesContext,
  SavedMoviesContext,
  CurrentUserContext,
} from "../../utils/contexts";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import MainApi from "../../utils/api/MainApi";

function App() {
  const [currentUser, setCurrentUser] = useState({
    isLogged: false,
    isLogging: true,
    name: "",
    email: "",
  });
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isFound, setIsFound] = useState(true);
  const onOpen = () => setIsFound(false);
  const onClose = () => setIsFound(true);

  useEffect(() => {
    MainApi.getMovies().then(({ data: movies }) => {
      setSavedMovies(movies);
      console.log(movies);
    });
  }, [setSavedMovies]);
  
  useEffect(() => {
    MainApi.getProfile().then(({ data }) => {
      const { email, name } = data;
      setCurrentUser({
        isLogged: true,
        name,
        email,
        isLogging: false,
      });

    }).catch((err) => {
      console.log(err);
      setCurrentUser({
        isLogged: false,
        name: '',
        email: '',
        isLogging: false,
      });
      // !!! ERROR PROCESSING !!!
    });
  }, []);

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
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
          <SavedMoviesContext.Provider value={{ savedMovies, setSavedMovies }}>
            <MoviesContext.Provider value={{ movies, setMovies }}>
              {isFound &&
                location.pathname !== "/signup" &&
                location.pathname !== "/signin" && <Header />}
              <Routes>
                <Route exact path="/" element={<Main />} />
                <Route
                  exact
                  path="/movies"
                  element={<ProtectedRoute element={Movies} />}
                />
                <Route
                  exact
                  path="/saved-movies"
                  element={<ProtectedRoute element={SavedMovies} />}
                />
                <Route
                  exact
                  path="/profile"
                  element={<ProtectedRoute element={Profile} />}
                />
                <Route exact path="/signup" element={<Register />} />
                <Route exact path="/signin" element={<Login />} />
                <Route
                  path="*"
                  element={<NotFoundPage onOpen={onOpen} onClose={onClose} />}
                />
              </Routes>
              {isFound &&
                location.pathname !== "/signup" &&
                location.pathname !== "/signin" &&
                location.pathname !== "/profile" && <Footer />}
            </MoviesContext.Provider>
          </SavedMoviesContext.Provider>
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
