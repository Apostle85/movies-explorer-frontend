import { useEffect } from "react";
import { Link } from "react-router-dom";
import './NotFoundPage.css';

export default function NotFoundPage(props) {
  useEffect(() => {
    props.onOpen();
    return props.onClose;
  }, []);

  return (
    <main className="not-found-page">
      <h1 className="not-found-page__title">404</h1>
      <p className="not-found-page__subtitle">Страница не найдена</p>
      <Link className="not-found-page__link" to="/">Назад</Link>
    </main>
  );
}
