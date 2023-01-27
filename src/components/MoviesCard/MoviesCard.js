import React, { useEffect } from "react";
import "./MoviesCard.css";
import { SavedMoviesContext } from "../../utils/contexts";

export default function MoviesCard(props) {
  const { savedMovies, setSavedMovies } = React.useContext(SavedMoviesContext);

  const [isClicked, setIsClicked] = React.useState(props.saved ? true : savedMovies.some(movie=>movie.id===props.id)? true:false);
  useEffect(() => {
    if(!props.saved) {
    console.log(isClicked);
    isClicked
      ? setSavedMovies([...savedMovies, { src: props.src, id: props.id }])
      : setSavedMovies(savedMovies.filter((movie) => props.id !== movie.id));
    }

  },[isClicked]);

  return (
    <li className="movies-card">
      <div className="movies-card__container">
        <div className="movies-card__info">
          <h2 className="movies-card__title">33 слова о дизайне</h2>
          <p className="movies-card__duration">1ч 47м</p>
        </div>
        {props.saved ? (
          <button
            onClick={() => {
              setSavedMovies(
                savedMovies.filter((movie) => props.id !== movie.id)
              );
            }}
            className={`movies-card__save-button ${
              isClicked
                ? "movies-card__save-button_state_saved"
                : "movies-card__save-button_state_disabled"
            }`}
          ></button>
        ) : (
          <button
            onClick={() => setIsClicked(!isClicked)}
            className={`movies-card__save-button ${
              isClicked && "movies-card__save-button_state_active"
            }`}
          ></button>
        )}
      </div>
      <img src={props.src} className="movies-card__image" />
    </li>
  );
}
