import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";
import { CurrentUserContext, MoviesContext } from "../../utils/contexts";
import MoviesApi from "../../utils/api/MoviesApi";
import { useContext, useEffect } from "react";
import {
  UNNAMED_API_ERR,
  NOT_FOUND_API_ERR,
  EMPTY_INPUT_ERR,
} from "../../utils/constants";

export default function SearchForm(props) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { movies, setMovies } = useContext(MoviesContext);
  const { input, setInput } = props.input;
  const { setIsLoading, setIsSubmit } = props;
  const { isShortMovieChecked, setIsShortMovieChecked } = props.onShort;

  useEffect(() => {
    if (
      !props.saved &&
      localStorage.getItem("searchState") &&
      localStorage.getItem("searchCheckbox")
    ) {
      const searchState = JSON.parse(localStorage.getItem("searchState"));
      setInput(searchState.input);
      const searchCheckBox = JSON.parse(localStorage.getItem("searchCheckbox"));
      setIsShortMovieChecked(searchCheckBox.isShortMovieChecked);
      console.log(searchCheckBox.isShortMovieChecked);
    }
  }, [setInput, setIsShortMovieChecked, props.saved]);

  const handleSearchButtonClick = (e) => {
    const search = input;
    e.preventDefault();
    props.onError({ isError: false, message: "" });
    localStorage.setItem("searchState", JSON.stringify({ input }));

    if (search.length === 0) {
      props.onError({ isError: true, message: EMPTY_INPUT_ERR });
      return;
    }

    if (props.saved) {
      setIsSubmit(true);
    } else if (movies.length === 0) {
      setIsLoading(true);
      if (localStorage.getItem("cards")) {
        setMovies(JSON.parse(localStorage.getItem("cards")));
        setIsLoading(false);
        setIsSubmit(true);
      } else {
        MoviesApi.getCards()
          .then((cards) => {
            if (cards.length === 0) {
              props.onError({ isError: true, message: NOT_FOUND_API_ERR });
              return;
            }
            localStorage.setItem("cards", JSON.stringify(cards));
            setMovies(cards);
            setIsLoading(false);
            setIsSubmit(true);
            console.log(cards);
          })
          .catch((err) => {
            console.log(err);
            props.onError({
              isError: true,
              message: UNNAMED_API_ERR,
            });
          });
      }
    } else {
      setIsSubmit(true);
    }
  };

  const handleCheckboxClick = () => {
    console.log("checkin");
    localStorage.setItem(
      props.saved ? "savedSearchCheckbox" : "searchCheckbox",
      JSON.stringify({ isShortMovieChecked: !isShortMovieChecked })
    );
    setIsShortMovieChecked(!isShortMovieChecked);
  };

  return (
    <section className="search-form">
      <form className="search-form__form">
        <div className="search-form__search-container">
          <input
            required
            className="search-form__input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Фильм"
          />
          <button
            onClick={handleSearchButtonClick}
            className="search-form__search-button"
            type="submit"
          >
            Найти
          </button>
        </div>
        <div className="search-form__checkbox-container">
          <FilterCheckbox
            isShortMovieChecked={isShortMovieChecked}
            onClick={handleCheckboxClick}
          />
          <p className="search-form__checkbox-title">Короткометражки</p>
        </div>
      </form>
    </section>
  );
}
