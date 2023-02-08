import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../Authform/AuthForm";
import headerLogo from "../../images/header__logo.svg";
import "./Register.css";
import { useContext, useEffect, useState } from "react";
import MainApi from "../../utils/api/MainApi";
import { CurrentUserContext, SavedMoviesContext } from "../../utils/contexts";

export default function Register(props) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { savedMovies, setSavedMovies } = useContext(SavedMoviesContext);
  const [isRegisterValid, setIsRegisterValid] = useState(false);
  const navigate = useNavigate();
  const [regData, setRegData] = useState({});
  const [error, setError] = useState({
    isError: false,
    status: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({ isError: false, message: "" });
    MainApi.register(regData)
      .then(({ data }) => {
        return MainApi.login(regData);
      })
      .then(({ data, token }) => {
        if (token) {
          localStorage.setItem("jwtoken", token);
        }
        setCurrentUser({
          ...currentUser,
          isLogged: true,
          name: regData.name,
          email: regData.email,
          token: token,
        });
        return MainApi.getMovies(token)
      })
      .then(({ data: movies }) => {
        setSavedMovies(movies);
        console.log(movies);
      })
      .catch((err) => {
        const error = JSON.parse(err.message);
        setError({
          isError: true,
          message:
            error.message === "Validation failed"
              ? "При регистрации пользователя произошла ошибка"
              : error.message,
        });
        console.log(error.message);
      });
  };

  useEffect(() => {
    if (currentUser.isLogged) navigate("/movies");
  }, [currentUser.isLogged, navigate]);

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
        <AuthForm
          onError={error}
          userInfo={{ regData, setRegData }}
          valid={{ isValid: isRegisterValid, setIsValid: setIsRegisterValid }}
          type="register"
          children={
            <button
              onClick={handleSubmit}
              disabled={!isRegisterValid}
              className={`register__button ${
                !isRegisterValid && "register__button_disabled"
              }`}
              type="submit"
            >
              Зарегистрироваться
            </button>
          }
        />
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
