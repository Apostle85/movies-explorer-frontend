import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import card_photo1 from "../../images/pic__COLOR_pic1.jpg";
import card_photo2 from "../../images/pic__COLOR_pic2.jpg";
import card_photo3 from "../../images/pic__COLOR_pic3.jpg";
import card_photo4 from "../../images/pic__COLOR_pic4.jpg";
import card_photo5 from "../../images/pic__COLOR_pic5.jpg";
import card_photo6 from "../../images/pic__COLOR_pic6.jpg";
import card_photo7 from "../../images/pic__COLOR_pic7.jpg";
import card_photo8 from "../../images/pic__COLOR_pic8.jpg";
import card_photo9 from "../../images/pic__COLOR_pic9.jpg";
import card_photo10 from "../../images/pic__COLOR_pic10.jpg";
import card_photo11 from "../../images/pic__COLOR_pic11.jpg";
import card_photo12 from "../../images/pic__COLOR_pic12.jpg";
import { SavedMoviesContext } from "../../utils/contexts";
import React, { useEffect } from "react";

export default function MoviesCardList(props) {
  const movies = [];
  movies.push(
    { src: card_photo1, id: 1, alt: 'Фотограф опирается на машину, улыбаясь детям'},
    { src: card_photo2, id: 2, alt: 'Парень в очках смотрит под углом в камеру' },
    { src: card_photo3, id: 3, alt: 'Парень с гитарой в руках сидит за столом'},
    { src: card_photo4, id: 4, alt: 'Человек в зале с колоннами'},
    { src: card_photo5, id: 5, alt: 'Трое человек катаются на скейтбордах по дороге среди машин'},
    { src: card_photo6, id: 6, alt: 'Мужчина разбирает кучу коробок в квартире'},
    { src: card_photo7, id: 7, alt: 'Трое мужчин в пиджаках смеются на фоне ворот'},
    { src: card_photo8, id: 8, alt: 'Мужчина сидит на фоне вагона, разрисованного граффити'},
    { src: card_photo9, id: 9, alt: 'Множество людей бегут на марафоне'},
    { src: card_photo10, id: 10, alt: 'Молодые люди танцуют на вечеринке на фоне других'},
    { src: card_photo11, id: 11, alt: 'Парень курит сигарету'},
    { src: card_photo12, id: 12, alt: 'Человек в очках смотрит в монитор в комнате'}
  );
  const { savedMovies, setSavedMovies } = React.useContext(SavedMoviesContext);
  useEffect(()=>console.log(savedMovies), [savedMovies]);
  const listMovies = props.saved
    ? savedMovies.map(({ src, id, alt }) => (
        <MoviesCard saved={props.saved} key={id} src={src} id={id} alt={alt} />
      ))
    : movies.map(({ src, id, alt }) => <MoviesCard key={id} src={src} id={id} alt={alt} />);

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__cards">{listMovies}</ul>
      {!props.saved && <button className="movies-card-list__button">Ещё</button>}
    </section>
  );
}
