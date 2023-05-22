import api from "../../../utils/api";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import styles from "./AddBlood.module.css";

import BloodForm from "../../form/BloodForm";

/* hooks */
import useFlashMessage from "../../../hooks/useFlashMessage";

function EditBlood() {
  const [blood, setBlood] = useState({});
  const [token] = useState(localStorage.getItem("token") || "");
  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api
      .get(`/bloods/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setBlood(response.data.blood);
      });
  }, [token, id]);

  async function updateBlood(blood) {
    let msgType = "success";

    const formData = new FormData();

    const bloodFormData = Object.keys(blood).forEach((key) => {
      formData.append(key, blood[key]);
    });

    formData.append("blood", bloodFormData);

    const data = await api
      .patch(`bloods/${blood._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  }

  return (
    <section>
      <div className={styles.addBlood_header}>
        <h1>Editar sangue</h1>
        <p>Após a edição, os novos dados serão atualizados no sistema</p>
      </div>
      {blood.name && (
        <BloodForm
          handleSubmit={updateBlood}
          bloodData={blood}
          btnText="Editar"
        />
      )}
    </section>
  );
}

export default EditBlood;
