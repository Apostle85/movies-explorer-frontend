import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import React, { useEffect } from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import { MoviesContext, SavedMoviesContext } from "../../utils/contexts";


export default function SavedMovies(props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmit, setIsSubmit] = React.useState(false);
  const [error, setError] = React.useState({
    isError: false,
    status: "",
    message: "",
  });
  const [input, setInput] = React.useState("");
  const { savedMovies, setSavedMovies } = React.useContext(SavedMoviesContext);
  const [isShortMovieChecked, setIsShortMovieChecked] = React.useState(false);

  React.useEffect(() => console.log("error check: ", error), [error]);

  const handleError = (err) => {
    setError({
      isError: err.isError,
      status: err.status || error.status,
      message: err.message || error.message,
    });
  };

  return (
    <main className="movies">
      <SearchForm
        saved={true}
        setIsSubmit={setIsSubmit}
        onError={handleError}
        setIsLoading={setIsLoading}
        input={{ input, setInput }}
        onShort={{ isShortMovieChecked, setIsShortMovieChecked }}
      />
      {isLoading ? (
        <Preloader />
      ) : error.isError ? (
        <p className="movies__error-message">{error.message}</p>
      ) : (
        <MoviesCardList
          onSubmit={{ isSubmit, setIsSubmit }}
          input={input}
          isShort={isShortMovieChecked}
          saved={true}
        />
      )}
    </main>
  );
}
