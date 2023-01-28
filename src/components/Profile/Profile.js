import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "../Authform/AuthForm";
import "./Profile.css";

export default function Profile(props) {
  const [isChangable, setIsChangable] = React.useState(false);
  // setIsChangable(true)
  return (
    <main className="profile">
      <section className="profile__container">
        <h1 className="profile__title">Привет, Илья!</h1>
        <AuthForm type="profile">
          {isChangable ? (
            <>
              <span className="profile__error">TESTTESTTESTTESTTESTTEST</span>
              <button
                className="profile__button profile__button_type_submit"
                onClick={() => setIsChangable(false)}
                type="submit"
              >
                Сохранить
              </button>
            </>
          ) : (
            <button
              className="profile__button profile__button_type_change"
              onClick={() => setIsChangable(true)}
            >
              Редактировать
            </button>
          )}
        </AuthForm>
        {!isChangable && (
          <Link className="profile__link" to="/signin">
            Выйти из аккаунта
          </Link>
        )}
      </section>
    </main>
  );
}
