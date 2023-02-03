import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import React, { useEffect } from "react";
import "./Movies.css";

export default function Movies(props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmit, setIsSubmit] = React.useState(false);
  const [error, setError] = React.useState({
    isError: false,
    status: "",
    message: "",
  });
  const [input, setInput] = React.useState("");
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
        setIsSubmit={setIsSubmit}
        saved={false}
        onError={handleError}
        setIsLoading={setIsLoading}
        input={{ input, setInput }}
        onShort={{isShortMovieChecked, setIsShortMovieChecked}}
      />
      {isLoading ? (
        <Preloader />
      ) : error.isError ? (
        <p className="movies__error-message">{error.message}</p>
      ) : (
        <MoviesCardList onSubmit={{isSubmit, setIsSubmit}} input={input} isShort={isShortMovieChecked} saved={false} />
      )}
    </main>
  );
}
