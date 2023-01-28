import { Link } from "react-router-dom";
import AuthForm from "../Authform/AuthForm";
import headerLogo from "../../images/header__logo.svg";
import "./Register.css";

export default function Register(props) {
  return (
    <main className="register">
      <section className="register__container">
        <Link className="register__logo-link" to="/">
          <img
            src={headerLogo}
            className="register__logo"
            alt="Логотип Дипломного Проекта"
          />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <AuthForm type="register">
          <button className="register__button" type="submit">
            Зарегистрироваться
          </button>
        </AuthForm>
        <div className="register__link-container">
          <p className="register__link-title">Уже зарегистрированы?</p>
          <Link className="register__link" to="/signin">
            Войти
          </Link>
        </div>
      </section>
    </main>
  );
}
