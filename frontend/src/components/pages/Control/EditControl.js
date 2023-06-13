import api from "../../../utils/api";

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import styles from "./Registers.module.css";

import ControlForm from "../../form/ControlForm";

/* hooks */
import useFlashMessage from "../../../hooks/useFlashMessage";

function EditControl() {
  const [control, setControl] = useState({});
  const [token] = useState(localStorage.getItem("token") || "");
  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/controls/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setControl(response.data.control);
      });
  }, [token, id]);

  async function updateControl(control) {
    let msgType = "success";

    try {
      const response = await api.patch(`/controls/${control._id}`, control, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      const data = response.data;
      setFlashMessage(data.message, msgType);
      navigate("/registers");
    } catch (error) {
      msgType = "error";
      const data = error.response.data;
      setFlashMessage(data.message, msgType);
    }
  }

  return (
    <section>
      <div className={styles.registers_header}>
        <h1>Editar Registro</h1>
        <p>Após a edição, os novos dados serão atualizados no sistema</p>
      </div>
      {control._id && (
        <div>
          <ControlForm
            handleSubmit={updateControl}
            controlData={control}
            btnText="Editar"
          />
        </div>
      )}
    </section>
  );
}

export default EditControl;
