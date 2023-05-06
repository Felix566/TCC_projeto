import api from "../../../utils/api";

import styles from "./AddBlood.module.css";

import { useState } from "react";
import { Navigate } from "react-router-dom";

/* components */
import BloodForm from "../../form/BloodForm";

/* hooks */
import useFlashMessage from "../../../hooks/useFlashMessage";

function AddBlood() {
  return (
    <section className={styles.addBlood_header}>
      <div>
        <h1>Adicione uma Bolsa</h1>
      </div>
      <BloodForm btnText="Adicionar" />
    </section>
  );
}

export default AddBlood;
