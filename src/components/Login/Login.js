import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../Authform/AuthForm";
import headerLogo from "../../images/header__logo.svg";
import "./Login.css";
import { useContext, useEffect, useState } from "react";
import MainApi from "../../utils/api/MainApi";
import { CurrentUserContext } from "../../utils/contexts";

export default function Login(props) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
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
      .then(({ data }) => {
        setCurrentUser({
          isLogged: true,
          name: regData.name,
          email: regData.email,
        });
        navigate("/movies");
      })
      .catch((err) => {
        const error = JSON.parse(err.message);
        if (error.message)
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
