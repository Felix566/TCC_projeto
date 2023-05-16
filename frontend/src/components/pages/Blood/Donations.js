import api from "../../../utils/api";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "./Dashboard.module.css";

/* hooks */
import useFlashMessage from "../../../hooks/useFlashMessage";

function Donations() {
  const [bloods, setBloods] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api
      .get("/blood/donations", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setBloods(response.data.bloods);
      });
  }, [token]);

  async function removeBlood(id) {
    let msgType = "sucess";

    const data = await api
      .delete(`/blood/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        const updatedBloods = bloods.filter((blood) => blood._id !== id);
        setBloods(updatedBloods);
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
      <div className={styles.bloodlist_header}>
        <h1>Doações Diárias</h1>
        <Link to="/blood/add">Adicionar Bolsas</Link>
      </div>

      <div className={styles.bloodlist_container}>
        {bloods.length > 0 &&
          bloods.map((blood) => (
            <div key={blood._id} className={styles.bloodlist_row}>
              <span className="bold">{blood.name}</span>
              <div className={styles.actions}>
                <>
                  <Link to={`/blood/edit/${blood._id}`}>Editar</Link>
                  <button
                    onClick={() => {
                      removeBlood(blood._id);
                    }}
                  >
                    Excluir
                  </button>
                </>
              </div>
            </div>
          ))}
        {bloods.length === 0 && <p>Ainda não há doações adicionadas!</p>}
      </div>
    </section>
  );
}

export default Donations;
