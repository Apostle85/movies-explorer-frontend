import React, { useContext, useEffect } from "react";
import "./MoviesCard.css";
import { CurrentUserContext, SavedMoviesContext } from "../../utils/contexts";
import MainApi from "../../utils/api/MainApi";
import { MAIN_API_URL, MOVIES_API_URL } from "../../utils/constants";
import { getShortMovieTime, searchMovies } from "../../utils/utils";

export default function MoviesCard(props) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
  } = props.movie;
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const {exactMovies, setExactMovies}=props.exactMovies;
  const { savedMovies, setSavedMovies } = React.useContext(SavedMoviesContext);

  const [isClicked, setIsClicked] = React.useState(
    props.saved
      ? true
      : savedMovies.some((movie) => props.movie.id === movie.movieId)
      ? true
      : false
  );

  // useEffect(() => {
  //   if (!props.saved) {
  //     isClicked
  //       ? setSavedMovies([...savedMovies, { src: props.src, id: props.id }])
  //       : setSavedMovies(savedMovies.filter((movie) => props.id !== movie.id));
  //   }
  // }, [isClicked]);

  const handleSaveButtonClick = (e) => {
    e.preventDefault();
    isClicked
      ? MainApi.forgetMovie(props.movie.id, currentUser.token)
          .then((movie) => {
            console.log("DELETED");
            setSavedMovies(
              savedMovies.filter(
                (movie) => props.movie.id !== movie.movieId
              )
            );
            setExactMovies(
              exactMovies.filter((movie) => props.movie.id !== movie.movieId)
            );
            setIsClicked(false);
          })
          .catch((err) => {
            console.log(err);
          })
      : MainApi.saveMovie({
          country,
          director,
          duration,
          year,
          description,
          image,
          trailerLink,
          nameRU,
          nameEN,
          id: props.movie.id,
        },currentUser.token)
          .then(({data}) => {
            console.log(data);
            setIsClicked(true);
            setSavedMovies([
              ...savedMovies, data]
              )
          })
          .catch((err) => {
            console.log(err);
          });
  };

  const handleRemoveButtonClick = () => {
    MainApi.forgetMovie(props.movie.movieId,currentUser.token)
      .then((movie) => {
        console.log("DELETED");
        setExactMovies(
          exactMovies.filter((movie) => props.movie.movieId !== movie.movieId)
        );
        setSavedMovies(
          savedMovies.filter((movie) => props.movie.movieId !== movie.movieId)
        );
        setIsClicked(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <li className="movies-card">
      <div className="movies-card__container">
        <div className="movies-card__info">
          <h2 className="movies-card__title">{nameRU}</h2>
          <p className="movies-card__duration">{getShortMovieTime(duration)}</p>
        </div>
        {props.saved ? (
          <button
            onClick={handleRemoveButtonClick}
            className={`movies-card__save-button ${
              isClicked
                ? "movies-card__save-button_state_saved"
                : "movies-card__save-button_state_disabled"
            }`}
          ></button>
        ) : (
          <button
            onClick={handleSaveButtonClick}
            className={`movies-card__save-button ${
              isClicked && "movies-card__save-button_state_active"
            }`}
          ></button>
        )}
      </div>
      <a href={trailerLink} target="_blank" className="movies-card__link">
      <img
        src={`${props.saved ? image : MOVIES_API_URL + image.url}`}
        alt={nameRU}
        className="movies-card__image"
      />
      </a>
    </li>
  );
}
