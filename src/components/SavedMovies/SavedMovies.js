import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import React from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";

export default function SavedMovies(props) {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <main className="movies">
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <SearchForm />
          <MoviesCardList saved={true}/>
        </>
      )}
    </main>
  );
}
