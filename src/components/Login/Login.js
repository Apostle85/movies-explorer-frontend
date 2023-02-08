import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../Authform/AuthForm";
import headerLogo from "../../images/header__logo.svg";
import "./Login.css";
import { useContext, useEffect, useState } from "react";
import MainApi from "../../utils/api/MainApi";
import { CurrentUserContext, SavedMoviesContext } from "../../utils/contexts";

export default function Login(props) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { savedMovies, setSavedMovies } = useContext(SavedMoviesContext);
  const [isLoginValid, setIsLoginValid] = useState(false);
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
    MainApi.login(regData)
      .then(({ data, token }) => {
        console.log(token);
        if (token) {
          console.log(token);
          localStorage.setItem("jwtoken", token);
        }
        setCurrentUser({
          ...currentUser,
          isLogged: true,
          isLogging: true,
          email: regData.email,
          token: token,
        });
        return MainApi.getMovies(token);
      })
      .then(({ data: movies }) => {
        setSavedMovies(movies);
      })
      .catch((err) => {
        const error = JSON.parse(err.message);
        if (error.message)
          setError({
            isError: true,
            message:
              error.message === "Validation failed"
                ? "При авторизации пользователя произошла ошибка"
                : error.message,
          });
        console.log(error.message);
      });
  };

  useEffect(() => {
    console.log('CHECKING');
    if (currentUser.isLogged && currentUser.isLogging) {
      console.log('CHECKING2');
      MainApi.getProfile(currentUser.token)
        .then(({ data: { email, name } }) => {
          setCurrentUser({
            isLogged: true,
            isLogging: false,
            token: currentUser.token,
            name,
            email,
          });
          navigate("/movies");
        })
        .catch((err) => {
          const error = JSON.parse(err.message);
          if (error.message)
            setError({
              isError: true,
              message: error.message,
            });
          console.log(error.message);
          navigate("/movies");
        });
    }
  }, [currentUser.isLogged, currentUser.token, navigate, setCurrentUser]);

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
        <AuthForm
          onError={error}
          userInfo={{ regData, setRegData }}
          valid={{ isValid: isLoginValid, setIsValid: setIsLoginValid }}
          type="login"
        >
          <button
            onClick={handleSubmit}
            disabled={!isLoginValid}
            className={`login__button ${
              !isLoginValid && "login__button_disabled"
            }`}
            type="submit"
          >
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
