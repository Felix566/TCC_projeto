import api from "../../../utils/api";

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import styles from "./AddBlood.module.css";

import BloodForm from "../../form/BloodForm";

/* hooks */
import useFlashMessage from "../../../hooks/useFlashMessage";

/*utils*/
import { removeEmptyProperties } from "../../../utils/removeObjectNullValues";

function EditBlood() {
  const [blood, setBlood] = useState({});
  const [token] = useState(localStorage.getItem("token") || "");
  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

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

    try {
      const response = await api.patch(
        `/bloods/${blood._id}`,
        removeEmptyProperties(blood),
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );

      const data = response.data;
      setFlashMessage(data.message, msgType);
      navigate("/bloods/donations");
    } catch (error) {
      msgType = "error";
      const data = error.response.data;
      setFlashMessage(data.message, msgType);
    }
  }

  return (
    <section>
      <div className={styles.addBlood_header}>
        <h1>Editar Registro</h1>
        <p>Após a edição, os novos dados serão atualizados no sistema</p>
      </div>
      {blood._id && (
        <div>
          <BloodForm
            handleSubmit={updateBlood}
            bloodData={blood}
            btnText="Editar"
          />
        </div>
      )}
    </section>
  );
}

export default EditBlood;
