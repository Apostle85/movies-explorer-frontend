import Input from "../Input/Input";
import "./AuthForm.css";

export default function AuthForm(props) {
  return (
    <form className="auth-form">
      {props.type !== "login" && (
        <label
          className={`auth-form__label ${
            props.type === "profile" && "auth-form__label_form_profile"
          }`}
        >
          Имя
          <Input
            name="name"
            type="text"
            required
            class={`auth-form__input ${
              props.type === "profile" && "auth-form__input_form_profile"
            } auth-form__input_type_name`}
          />
          {props.type !== "profile" && (
            <span className={`auth-form__input-error`}></span>
          )}
        </label>
      )}
      <label
        className={`auth-form__label ${
          props.type === "profile" && "auth-form__label_form_profile"
        }`}
      >
        E-mail
        <Input
          name="email"
          type="email"
          required
          class={`auth-form__input ${
            props.type === "profile" && "auth-form__input_form_profile"
          } auth-form__input_type_email`}
        />
        {props.type !== "profile" && (
          <span className={`auth-form__input-error`}>TESTTESTTEST</span>
        )}
      </label>
      {props.type !== "profile" && (
        <label
          className={`auth-form__label ${
            props.type === "profile" && "auth-form__label_form_profile"
          }`}
        >
          Пароль
          <Input
            name="password"
            type="password"
            required
            class={`auth-form__input ${
              props.type === "profile" && "auth-form__input_form_profile"
            } auth-form__input_type_password`}
          />
          {props.type !== "profile" && (
            <span className={`auth-form__input-error`}></span>
          )}
        </label>
      )}
      {props.children}
    </form>
  );
}
