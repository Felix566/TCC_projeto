import React, { useState, useContext } from "react";

import Input from "../../form/Input";
import { Link } from "react-router-dom";

import styles from "../../form/Form.module.css";
import { DarkModeContext } from "../../layout/DarkModeContext";

/* contexts */
import { Context } from "../../../context/UserContext";

function Register() {
  const [user, setUser] = useState({});
  const { register } = useContext(Context);
  const { isDarkMode } = useContext(DarkModeContext);

  const containerClassName = isDarkMode
    ? `${styles.form_container} ${styles["form_container-dark"]}`
    : styles.form_container;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(user);
  };

  return (
    <div className={styles.page_container}>
      <section className={containerClassName}>
        <h1>Registrar</h1>
        <form onSubmit={handleSubmit}>
          <Input
            text="Nome"
            type="text"
            name="name"
            placeholder="Digite seu nome"
            handleOnChange={handleChange}
          />
          <Input
            text="Telefone"
            type="text"
            name="phone"
            placeholder="Digite seu telefone"
            handleOnChange={handleChange}
          />
          <Input
            text="E-mail"
            type="email"
            name="email"
            placeholder="Digite seu E-mail"
            handleOnChange={handleChange}
          />
          <Input
            text="Senha"
            type="password"
            name="password"
            placeholder="Digite sua senha"
            handleOnChange={handleChange}
          />
          <Input
            text="Confirmação de Senha"
            type="password"
            name="confirmpassword"
            placeholder="Confirme a sua senha"
            handleOnChange={handleChange}
          />
          <input type="submit" value="Cadastrar" />
        </form>
        <p>
          Já é cadastrado? <Link to="/">Clique aqui.</Link>
        </p>
      </section>
    </div>
  );
}

export default Register;
