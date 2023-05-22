import api from "../../../utils/api";

import styles from "./AddBlood.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* components */
import BloodForm from "../../form/BloodForm";

/* hooks */
import useFlashMessage from "../../../hooks/useFlashMessage";

function AddBlood() {
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  async function registerBlood(blood) {
    let msgType = "success";

    const data = await api
      .post(
        "/bloods/create",
        {
          donator: blood.donator,
          cpf: blood.cpf,
          nasc: blood.nasc,
          age: blood.age,
          phone: blood.phone,
          marital: blood.marital,
          sex: blood.sex,
          bloodVolume: blood.bloodVolume,
          bloodType: blood.bloodType,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      )
      .then((response) => {
        navigate("/bloods/donations");
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  }
  return (
    <section className={styles.addBlood_header}>
      <div>
        <h1>Adicione uma Bolsa</h1>
      </div>
      <BloodForm handleSubmit={registerBlood} btnText="Adicionar" />
    </section>
  );
}

export default AddBlood;
