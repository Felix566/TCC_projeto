import React, { useState, useContext } from "react";
import Input from "../../form/Input";
import { Link } from "react-router-dom";

import styles from "../../form/Form.module.css";
import { DarkModeContext } from "../../layout/DarkModeContext";

/* context */
import { Context } from "../../../context/UserContext";

function Login() {
  const [user, setUser] = useState({});
  const { login } = useContext(Context);
  const { isDarkMode } = useContext(DarkModeContext);

  const containerClassName = isDarkMode
    ? `${styles.form_container} ${styles["form_container-dark"]}`
    : styles.form_container;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(user);
  };

  return (
    <div className={styles.page_container}>
      <section className={containerClassName}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <Input
            text="Email"
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            handleOnChange={handleChange}
          />
          <Input
            text="Senha"
            type="password"
            name="password"
            placeholder="Digite sua senha"
            handleOnChange={handleChange}
          />
          <input type="submit" value="Entrar" />
        </form>
        <p>
          Não é registrado? <Link to="/register">Clique aqui!</Link>
        </p>
      </section>
    </div>
  );
}

export default Login;
