import "./Footer.css";

export default function Footer(props) {
  return (
    <footer className="footer">
      <h2 className="footer__subtitle">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__container">
        <p className="footer__year">&copy; {new Date().getFullYear()}</p>
        <div className="footer__links">
          <a
            href="https://practicum.yandex.ru/"
            className="footer__link"
            target="_blank"
          >
            Яндекс.Практикум
          </a>
          <a
            href="https://github.com/Apostle85"
            className="footer__link"
            target="_blank"
          >
            Github
          </a>
        </div>
      </div>
    </footer>
  );
}
