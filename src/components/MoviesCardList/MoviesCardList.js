import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import { SavedMoviesContext, MoviesContext } from "../../utils/contexts";
import React, { useCallback, useEffect } from "react";
import { searchMovies } from "../../utils/utils";

export default function MoviesCardList(props) {
  const { movies } = React.useContext(MoviesContext);
  const { savedMovies } = React.useContext(SavedMoviesContext);
  const choosedMovies = props.saved ? savedMovies : movies;
  const [exactMovies, setExactMovies] = React.useState(choosedMovies);
  const [rowIndex, setRowIndex] = React.useState(0);
  const { isSubmit, setIsSubmit } = props.onSubmit;
  const isShortMovieChecked = props.isShort;

  const getRowElementsNumber = () => {
    let elementWidth = 364;
    if (document.documentElement.clientWidth > 768) elementWidth = 364;
    else if (document.documentElement.clientWidth > 488) elementWidth = 339;
    else elementWidth = 300;

    const grid = document.querySelector(".movies-card-list__cards");
    const gridWidth =
      grid.clientWidth - parseInt(window.getComputedStyle(grid).gap);
    return Math.floor(gridWidth / elementWidth);
  };

  // const getRendereRowElementsNumber = (selector) => {
  //   const grid = Array.from(document.querySelector(selector).children);
  //   const defaultOffset = grid[0].offsetTop;
  //   const uncommonOffsetIndex = grid.findIndex(
  //     (item) => item.offsetTop > defaultOffset
  //   );
  //   return uncommonOffsetIndex === -1 ? grid.length : uncommonOffsetIndex;
  // };

  React.useEffect(() => {
    if (!props.saved) {
      let number = getRowElementsNumber();
      if (document.documentElement.clientWidth > 488) setRowIndex(number * 4);
      else setRowIndex(number * 5);
    }
  }, [isSubmit, props.saved]);

  React.useEffect(() => {
    if (
      localStorage.getItem(props.saved ? "savedExactMovies" : "exactMovies")
    ) {
      console.log("START");
      setExactMovies(
        JSON.parse(
          localStorage.getItem(props.saved ? "savedExactMovies" : "exactMovies")
        ).exactMovies
      );
    }
  }, [props.saved]);

  const listMovies = useCallback(
    (movies) => {
      let moviesPart = movies;
      setIsSubmit(false);
      moviesPart = searchMovies(moviesPart, props.input);
      console.log(moviesPart);
      localStorage.setItem(
        props.saved ? "savedExactMovies" : "exactMovies",
        JSON.stringify({ exactMovies: moviesPart })
      );
      return moviesPart;
    },
    [setIsSubmit, props.input, props.saved]
  );

  useEffect(() => {
    if (isSubmit) setExactMovies(listMovies(choosedMovies));
    console.log("check");
  }, [choosedMovies, isSubmit, listMovies]);

  const handleButtonClick = () => {
    let number = getRowElementsNumber();

    if (document.documentElement.clientWidth > 488)
      setRowIndex(rowIndex + number);
    else setRowIndex(rowIndex + 2 * number);
  };

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__cards">
        {(props.saved
          ? exactMovies
          : exactMovies.filter((movie, index) => index < rowIndex)
        )
          .filter((movie) =>
            !isShortMovieChecked ? true : movie.duration <= 40
          )
          .map((movie) => {
            console.log(movie);
            return (
              <MoviesCard
                exactMovies={{exactMovies, setExactMovies}}
                key={props.saved ? movie.movieId : movie.id}
                movie={movie}
                saved={props.saved || false}
              />
            );
          })}
      </ul>
      {exactMovies.filter((movie) =>
        !isShortMovieChecked ? true : movie.duration <= 40
      ).length > rowIndex &&
        !props.saved && (
          <button
            onClick={handleButtonClick}
            className="movies-card-list__button"
          >
            Ещё
          </button>
        )}
    </section>
  );
}
