import React, { useContext } from "react";
import { Link } from "react-router-dom";

import ErrorImage from "../../assets/img/404.svg";
import AccessError from "../../assets/img/401 Error.svg";
import styles from "./Error.module.css";
import { Context } from "../../context/UserContext";
import { DarkModeContext } from "./DarkModeContext";

const Error = () => {
  const { authenticated } = useContext(Context);
  const { isDarkMode } = useContext(DarkModeContext);

  const containerClassName = isDarkMode
    ? `${styles.container} ${styles["dark"]}`
    : styles.container;
  const contentClassName = isDarkMode
    ? `${styles.content} ${styles["dark"]}`
    : styles.content;

  return (
    <div className={containerClassName}>
      {authenticated ? (
        <div className={contentClassName}>
          <img
            src={ErrorImage}
            alt="imagem de erro"
            className={styles.error_image}
          />
          <h2>PAGE NOT FOUND</h2>
          <Link to="/home" className={styles.btn}>
            Retorne para a página inicial
          </Link>
        </div>
      ) : (
        <div className={contentClassName}>
          <img
            src={AccessError}
            alt="imagem de erro"
            className={styles.error_image}
          />
          <h2>ACESSO NÃO AUTORIZADO</h2>
          <Link to="/" className={styles.btn}>
            Realize o login para ter acesso
          </Link>
        </div>
      )}
    </div>
  );
};

export default Error;
