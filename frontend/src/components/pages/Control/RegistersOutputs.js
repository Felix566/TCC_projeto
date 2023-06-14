import api from "../../../utils/api";

import styles from "./Registers.module.css";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* components */
import ExitForm from "../../form/ExitForm";

/* hooks */
import useFlashMessage from "../../../hooks/useFlashMessage";

function RegistersOutputs() {
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  async function registerOutput(exit) {
    let msgType = "success";

    const data = await api
      .post(
        "/exits/createOutput",
        {
          bloodQuantity: exit.bloodQuantity,
          bloodType: exit.bloodType,
          recipientName: exit.recipientName,
          exitType: exit.exitType,
          exitNotes: exit.exitNotes,
          destination: exit.destination,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      )
      .then((response) => {
        navigate("/exits");
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
        <h1>Registrar Informações de Saída</h1>
      </div>
      <ExitForm handleSubmit={registerOutput} btnText="Registrar" />
    </section>
  );
}

export default RegistersOutputs;
