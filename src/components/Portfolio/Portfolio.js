import "./Portfolio.css";

export default function Portfolio(props) {
  return (
    <section className="portfolio">
      <h2 className="portfolio__heading">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__element">
          <h3 className="portfolio__title">Статичный сайт</h3>
          <a href="https://github.com/Apostle85/how-to-learn" className="portfolio__ref-logo"></a>
        </li>
        <li className="portfolio__element">
          <h3 className="portfolio__title">Адаптивный сайт</h3>
          <a href="https://github.com/Apostle85/russian-travel" className="portfolio__ref-logo"></a>
        </li>
        <li className="portfolio__element">
          <h3 className="portfolio__title">Одностраничное приложение</h3>
          <a href="https://github.com/Apostle85/react-mesto-api-full" className="portfolio__ref-logo"></a>
        </li>
      </ul>
    </section>
  );
}
