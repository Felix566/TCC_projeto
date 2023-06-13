import api from "../../../utils/api";

import styles from "./Registers.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* components */
import ControlForm from "../../form/ControlForm";

/* hooks */
import useFlashMessage from "../../../hooks/useFlashMessage";

function Registers() {
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  async function registerControl(control) {
    let msgType = "success";

    const data = await api
      .post(
        "/controls/control",
        {
          bloodQuantity: control.bloodQuantity,
          bloodType: control.bloodType,
          additionalInfo: control.additionalInfo,
          reason: control.reason,
          bloodDestiny: control.bloodDestiny,
          receiver: control.receiver,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      )
      .then((response) => {
        navigate("/registers");
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  }
  return (
    <section className={styles.registers_header}>
      <div>
        <h1>Registrar Informações</h1>
      </div>
      <ControlForm handleSubmit={registerControl} btnText="Registrar" />
    </section>
  );
}

export default Registers;
