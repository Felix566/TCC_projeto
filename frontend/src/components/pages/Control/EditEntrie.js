import api from "../../../utils/api";

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import styles from "./Registers.module.css";

import EntryForm from "../../form/EntryForm";

/* hooks */
import useFlashMessage from "../../../hooks/useFlashMessage";

function EditEntrie() {
  const [entry, setEntry] = useState({});
  const [token] = useState(localStorage.getItem("token") || "");
  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/entries/${id}`, {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` },
      })
      .then((response) => {
        setEntry(response.data.entry);
      });
  }, [token, id]);

  async function updateEntry(entry) {
    let msgType = "success";

    try {
      const response = await api.patch(`/entries/${entry._id}`, entry, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      const data = response.data;
      setFlashMessage(data.message, msgType);
      navigate("/entries");
    } catch (error) {
      msgType = "error";
      const data = error.response.data;
      setFlashMessage(data.message, msgType);
    }
  }

  return (
    <section>
      <div className={styles.registers_header}>
        <h1>Editar Registro de Entrada</h1>
        <p>Após a edição, os novos dados serão atualizados no sistema</p>
      </div>
      {entry._id && (
        <div>
          <EntryForm
            handleSubmit={updateEntry}
            entryData={entry}
            btnText="Editar"
          />
        </div>
      )}
    </section>
  );
}

export default EditEntrie;
