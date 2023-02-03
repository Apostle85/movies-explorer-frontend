import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainApi from "../../utils/api/MainApi";
import { CurrentUserContext } from "../../utils/contexts";
import AuthForm from "../Authform/AuthForm";
import "./Profile.css";

export default function Profile(props) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [isProfileValid, setIsProfileValid] = useState(false);
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
    MainApi.updateProfile(regData)
      .then(({ data }) => {
        setCurrentUser({ name: data.name, email: data.email });
      })
      .catch((err) => {
        const error = JSON.parse(err.message);
        setError({ isError: true, message: error.message });
        console.log(error.message);
      });
  };

  const handleSignOut = (e) => {
    setError({ isError: false, message: "" });
    MainApi.logout()
      .then(({ data }) => {
        setCurrentUser({ isLogged: false, name: "", email: "" });
      })
      .catch((err) => {
        const error = JSON.parse(err.message);
        setError({ isError: true, message: error.message });
        console.log(error.message);
      });
  };

  useEffect(() => {
    if (!currentUser.isLogged) navigate("/");
  }, [currentUser.isLogged, navigate]);

  return (
    <main className="profile">
      <section className="profile__container">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <AuthForm
          onError={error}
          userInfo={{ regData, setRegData }}
          valid={{ isValid: isProfileValid, setIsValid: setIsProfileValid }}
          type="profile"
          children={
            <button
              onClick={handleSubmit}
              disabled={!isProfileValid}
              className={`profile__button profile__button_type_change ${
                !isProfileValid && "profile__button_disabled"
              }`}
              type="submit"
            >
              Редактировать
            </button>
          }
        />
        <Link onClick={handleSignOut} className="profile__link" to="/signin">
          Выйти из аккаунта
        </Link>
      </section>
    </main>
  );
}
