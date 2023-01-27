import { Link } from "react-router-dom";
import AuthForm from "../Authform/AuthForm";
import headerLogo from "../../images/header__logo.svg";
import "./Login.css";

export default function Login(props) {
  return (
    <main className="login">
      <section className="login__container">
        <Link className="login__logo-link" to="/">
          <img
            src={headerLogo}
            className="login__logo"
            alt="Логотип Дипломного Проекта"
          />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <AuthForm type="login">
          <button className="login__button" type="submit">
            Войти
          </button>
        </AuthForm>
        <div className="login__link-container">
          <p className="login__link-title">Ещё не зарегистрированы?</p>
          <Link className="login__link" to="/signup">
            Регистрация
          </Link>
        </div>
      </section>
    </main>
  );
}
