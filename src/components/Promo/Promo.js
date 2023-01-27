import promoPicture from "../../images/promo__picture.svg";
import "./Promo.css";

export default function Promo(props) {
  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <p className="promo__subtitle">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <a className="promo__anchor" href="#about-project">
          <button className="nav-button">Узнать больше</button>
        </a>
      </div>
      <img
        className="promo__picture"
        src={promoPicture}
        alt="Планета, выложенная словами 'WEB'"
      ></img>
    </section>
  );
}
