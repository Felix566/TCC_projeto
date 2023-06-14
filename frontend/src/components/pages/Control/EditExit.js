import api from "../../../utils/api";

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import styles from "./Registers.module.css";

import ExitForm from "../../form/ExitForm";

/* hooks */
import useFlashMessage from "../../../hooks/useFlashMessage";

function EditExit() {
  const [exit, setExit] = useState({});
  const [token] = useState(localStorage.getItem("token") || "");
  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/exits/${id}`, {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` },
      })
      .then((response) => {
        setExit(response.data.entry);
      });
  }, [token, id]);

  async function updateExit(exit) {
    let msgType = "success";

    try {
      const response = await api.patch(`/exits/${exit._id}`, exit, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      const data = response.data;
      setFlashMessage(data.message, msgType);
      navigate("/exits");
    } catch (error) {
      msgType = "error";
      const data = error.response.data;
      setFlashMessage(data.message, msgType);
    }
  }

  return (
    <section>
      <div className={styles.registers_header}>
        <h1>Editar Registro de Saída</h1>
        <p>Após a edição, os novos dados serão atualizados no sistema</p>
      </div>
      {exit._id && (
        <div>
          <ExitForm
            handleSubmit={updateExit}
            exitData={exit}
            btnText="Editar"
          />
        </div>
      )}
    </section>
  );
}

export default EditExit;
