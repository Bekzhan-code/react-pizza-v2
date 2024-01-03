import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchRegister, selectIsAuth } from "../../redux/slices/authSlice";

import styles from "./Registration.module.scss";

function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuth = useSelector(selectIsAuth);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fullName, setFullName] = React.useState("");

  const onHandleFullName = (event) => {
    setFullName(event.target.value);
  };

  const onHandleEmail = (event) => {
    setEmail(event.target.value);
  };

  const onHandlePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = async () => {
    const data = await dispatch(fetchRegister({ fullName, email, password }));
    if (!data.payload) alert("Не удалось зарегистрироваться");
    else window.localStorage.setItem("token", data.payload.token);
  };

  if (isAuth) {
    navigate("/");
  }
  return (
    <div className={styles.root}>
      <h3>Создание аккаунта</h3>
      <input
        type="text"
        placeholder="Полное имя"
        value={fullName}
        onChange={onHandleFullName}
      />
      <input
        type="email"
        placeholder="E-Mail"
        value={email}
        onChange={onHandleEmail}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={onHandlePassword}
      />
      <button className="btn btn--outline" onClick={onSubmit}>
        Зарегистрироваться
      </button>
    </div>
  );
}

export default Registration;
