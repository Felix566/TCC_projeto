import api from "../../../utils/api";

import styles from "./Registers.module.css";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* components */
import EntryForm from "../../form/EntryForm";

/* hooks */
import useFlashMessage from "../../../hooks/useFlashMessage";

function RegistersInputs() {
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  async function registerInput(entry) {
    let msgType = "success";

    const data = await api
      .post(
        "/entries/createInput",
        {
          bloodQuantity: entry.bloodQuantity,
          bloodType: entry.bloodType,
          donorName: entry.donorName,
          entryType: entry.entryType,
          entryNotes: entry.entryNotes,
          destination: entry.destination,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      )
      .then((response) => {
        navigate("/entries");
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  }

  return (
    <section className={styles.registers_headers}>
      <div>
        <h1>Registrar Informações de Entrada</h1>
      </div>
      <EntryForm handleSubmit={registerInput} btnText="Registrar" />
    </section>
  );
}

export default RegistersInputs;
