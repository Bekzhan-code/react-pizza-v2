import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchAuth, selectIsAuth } from "../../redux/slices/authSlice";

import styles from "./Login.module.scss";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuth = useSelector(selectIsAuth);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onHandleEmail = (event) => {
    setEmail(event.target.value);
  };

  const onHandlePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = async () => {
    const data = await dispatch(fetchAuth({ email, password }));
    if (!data.payload) alert("Не удалось авторизоваться");
    else window.localStorage.setItem("token", data.payload.token);
  };

  if (isAuth) {
    return navigate("/");
  }

  return (
    <div className={styles.root}>
      <h3>Вход в аккаунт</h3>
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
        Войти
      </button>
    </div>
  );
}

export default Login;
