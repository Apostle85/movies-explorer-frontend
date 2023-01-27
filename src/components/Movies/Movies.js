import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import React from "react";
import './Movies.css';

export default function Movies(props) {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(false);
    // setTimeout(()=>setIsLoading(false),1000);
    
  }, []);

  return (
    <main className="movies">
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <SearchForm />
          <MoviesCardList saved={false} />
        </>
      )}
    </main>
  );
}
