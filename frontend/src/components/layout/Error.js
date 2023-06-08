import React, { useContext } from "react";
import { Link } from "react-router-dom";

import ErrorImage from "../../assets/img/404.svg";
import styles from "./Error.module.css";
import { Context } from "../../context/UserContext";

const Error = () => {
  const { authenticated } = useContext(Context);
  return (
    <div className={styles.container}>
      {authenticated ? (
        <div className={styles.content}>
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
        <div className={styles.content}>
          <img
            src={ErrorImage}
            alt="imagem de erro"
            className={styles.error_image}
          />
          <h2>PAGE NOT FOUND</h2>
          <Link to="/" className={styles.btn}>
            Realize o login para ter acesso
          </Link>
        </div>
      )}
    </div>
  );
};

export default Error;
