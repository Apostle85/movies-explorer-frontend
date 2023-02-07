import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import { SavedMoviesContext, MoviesContext } from "../../utils/contexts";
import React, { useCallback, useEffect } from "react";
import { searchMovies } from "../../utils/utils";
import { BIG_CLIENT_WIDTH, BIG_ELEMENT_WIDTH, BIG_ROW_INDEX, MEDIUM_ELEMENT_WIDTH, NOT_FOUND_API_ERR, SMALL_CLIENT_WIDTH, SMALL_ROW_INDEX, TINY_ELEMENT_WIDTH } from "../../utils/constants";

export default function MoviesCardList({saved, onSubmit, isShort, onError, input}) {
  const { movies } = React.useContext(MoviesContext);
  const { savedMovies } = React.useContext(SavedMoviesContext);
  const choosedMovies = saved ? savedMovies : movies;
  const [exactMovies, setExactMovies] = React.useState(choosedMovies);
  const [rowIndex, setRowIndex] = React.useState(0);
  const { isSubmit, setIsSubmit } = onSubmit;
  const isShortMovieChecked = isShort;

  const getRowElementsNumber = () => {
    let elementWidth = BIG_ELEMENT_WIDTH;
    if (document.documentElement.clientWidth > BIG_CLIENT_WIDTH) elementWidth = BIG_ELEMENT_WIDTH;
    else if (document.documentElement.clientWidth > SMALL_CLIENT_WIDTH) elementWidth = MEDIUM_ELEMENT_WIDTH;
    else elementWidth = TINY_ELEMENT_WIDTH;

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
    if (!saved) {
      let number = getRowElementsNumber();
      if (document.documentElement.clientWidth > SMALL_CLIENT_WIDTH) setRowIndex(number * BIG_ROW_INDEX);
      else setRowIndex(number * SMALL_ROW_INDEX);
    }
  }, [isSubmit, saved]);

  const listMovies = useCallback(
    (movies) => {
      onError({ isError: false, status: "", message: "" });
      let moviesPart = movies;
      setIsSubmit(false);
      moviesPart = searchMovies(moviesPart, input);
      console.log(moviesPart);
      if (!saved) {
        localStorage.setItem(
          "exactMovies",
          JSON.stringify({ exactMovies: moviesPart })
        );
      }
      if (moviesPart.length === 0)
        onError({
          isError: true,
          status: "",
          message: NOT_FOUND_API_ERR,
        });
      return moviesPart;
    },
    [setIsSubmit, input, saved, onError]
  );

  React.useEffect(() => {
    if (!saved) {
      if (localStorage.getItem("exactMovies")) {
        const storageMovies = JSON.parse(
          localStorage.getItem("exactMovies")
        ).exactMovies;
        if (storageMovies !== [] && storageMovies !== undefined) {
          setExactMovies(storageMovies);
        }
      }
    } else {
      setExactMovies(choosedMovies);
    }
  }, [saved, choosedMovies]);

  useEffect(() => {
    if (isSubmit) setExactMovies(listMovies(choosedMovies));
  }, [choosedMovies, isSubmit, listMovies]);

  const handleButtonClick = () => {
    let number = getRowElementsNumber();

    if (document.documentElement.clientWidth > 891)
      setRowIndex(rowIndex + number);
    else setRowIndex(rowIndex + 2 * number);
  };

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__cards">
        {(saved
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
                exactMovies={{ exactMovies, setExactMovies }}
                key={saved ? movie.movieId : movie.id}
                movie={movie}
                saved={saved || false}
              />
            );
          })}
      </ul>
      {exactMovies.filter((movie) =>
        !isShortMovieChecked ? true : movie.duration <= 40
      ).length > rowIndex &&
        !saved && (
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
