import { useCallback, useContext, useEffect, useState } from "react";
import Input from "../Input/Input";
import "./AuthForm.css";
import {
  REQUIRED_PROFILE_INPUT_ERR,
  REQUIRED_INPUT_ERR,
  EMAIL_INPUT_ERR,
  NAME_INPUT_ERR,
} from "../../utils/constants";
import { CurrentUserContext } from "../../utils/contexts";

export default function AuthForm({ userInfo, type, valid, children, onError }) {
  const { currentUser } = useContext(CurrentUserContext);
  const { isValid, setIsValid } = valid;
  const [data, setData] = useState({
    email: type === "profile" ? currentUser.email : "",
    name: type === "profile" ? currentUser.name : "",
    password: "",
  });
  const { regData, setRegData } = userInfo;

  const [isFormValid, setIsFormValid] = useState({
    email: false,
    name: type === "login",
    password: type === "profile",
  });

  const validateEmail = (email) => {
    const validEmail = new RegExp(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    );
    return validEmail.test(email);
  };

  const validateName = (name) => {
    const validName = new RegExp(/^[А-ЯA-ZËёh-]+$/imu);
    return validName.test(name);
  };

  const profileCheck = useCallback(() => {
    if (currentUser.name !== data.name || currentUser.email !== data.email) {
      setRegData(data);
    }
  }, [data, currentUser, setRegData]);
  
  // Заменить на useMemo?
  useEffect(() => {
    if (isFormValid.email && isFormValid.name && isFormValid.password) {
      setIsValid(true);
      if (type === "profile") profileCheck();
      else setRegData(data);
      console.log("setRegData: ", data);
    }
  }, [type, isFormValid, setIsValid, setRegData, data, profileCheck]);

  const handleNameChange = () => {
    validateName(data.name) && data.name !== ""
      ? setIsFormValid({ ...isFormValid, name: true })
      : setIsFormValid({ ...isFormValid, name: false });
  };

  const handleEmailChange = () => {
    validateEmail(data.email) && data.email !== ""
      ? setIsFormValid({ ...isFormValid, email: true })
      : setIsFormValid({ ...isFormValid, email: false });
  };

  const handlePasswordChange = () => {
    data.password !== ""
      ? setIsFormValid({ ...isFormValid, password: true })
      : setIsFormValid({ ...isFormValid, password: false });
  };

  return (
    <form noValidate className="auth-form">
      {type !== "login" && (
        <label
          className={`auth-form__label ${
            type === "profile" && "auth-form__label_form_profile"
          }`}
        >
          Имя
          <Input
            onChange={handleNameChange}
            input={{
              value: data.name,
              setValue: (name) => setData({ ...data, name }),
            }}
            name="name"
            type="text"
            required
            class={`auth-form__input ${
              type === "profile" && "auth-form__input_form_profile"
            } auth-form__input_type_name`}
          />
          {type !== "profile" && (
            <span className={`auth-form__input-error`}>
              {data.name === ""
                ? REQUIRED_INPUT_ERR
                : !validateName(data.name)
                ? NAME_INPUT_ERR
                : ""}
            </span>
          )}
        </label>
      )}
      <label
        className={`auth-form__label ${
          type === "profile" && "auth-form__label_form_profile"
        }`}
      >
        E-mail
        <Input
          input={{
            value: data.email,
            setValue: (email) => setData({ ...data, email }),
          }}
          onChange={handleEmailChange}
          name="email"
          type="email"
          required
          class={`auth-form__input ${
            type === "profile" && "auth-form__input_form_profile"
          } auth-form__input_type_email`}
        />
        {type !== "profile" && (
          <span className={`auth-form__input-error`}>
            {data.email === ""
              ? REQUIRED_INPUT_ERR
              : !validateEmail(data.email)
              ? EMAIL_INPUT_ERR
              : ""}
          </span>
        )}
      </label>
      {type !== "profile" && (
        <label
          className={`auth-form__label ${
            type === "profile" && "auth-form__label_form_profile"
          }`}
        >
          Пароль
          <Input
            onChange={handlePasswordChange}
            input={{
              value: data.password,
              setValue: (password) => setData({ ...data, password }),
            }}
            name="password"
            type="password"
            required
            class={`auth-form__input ${
              type === "profile" && "auth-form__input_form_profile"
            } auth-form__input_type_password`}
          />
          {type !== "profile" && (
            <span className={`auth-form__input-error`}>
              {data.password === "" ? REQUIRED_INPUT_ERR : ""}
            </span>
          )}
        </label>
      )}
      {type === "profile" && (
        <span className="`auth-form__input-error profile__error">
          {data.name === "" || data.email === ""
            ? REQUIRED_PROFILE_INPUT_ERR
            : !validateName(data.name)
            ? NAME_INPUT_ERR
            : !validateEmail(data.email)
            ? EMAIL_INPUT_ERR
            : onError.isError
            ? onError.message
            : ""}
        </span>
      )}
      {type !== "profile" && (
        <span className="`auth-form__input-error profile__error">
          { onError.isError ? onError.message : "" }
        </span>
      )}
      {children}
    </form>
  );
}
