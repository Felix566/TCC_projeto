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

    const formData = new FormData();
    formData.append("donator", blood.donator);
    formData.append("cpf", blood.cpf);
    formData.append("nasc", blood.nasc);
    formData.append("age", blood.age);
    formData.append("phone", blood.phone);
    formData.append("marital", blood.marital);
    formData.append("sex", blood.sex);
    formData.append("bloodVolume", blood.bloodVolume);
    formData.append("bloodType", blood.bloodType);

    // await Object.keys(blood).forEach((key) => {
    //   formData.append([key, blood[key]]);
    // });

    //formData.append(blood, bloodFormData);

    // for (const key in blood) {
    //   formData.append(key, blood[key]);
    // }

    console.log(blood);

    const data = await api
      .post("/bloods/create", formData, {
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

    if (msgType !== "error") {
      navigate("/bloods/donations");
    }
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
