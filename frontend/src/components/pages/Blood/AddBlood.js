import api from "../../../utils/api";
import styles from "./AddBlood.module.css";

import { useState } from "react";
import { Navigate } from "react-router-dom";

function AddBlood() {
  return (
    <section className={styles.addBlood_header}>
      <div>
        <h1>Adicione uma Bolsa</h1>
      </div>
      <p>Formulário</p>
    </section>
  );
}

export default AddBlood;
