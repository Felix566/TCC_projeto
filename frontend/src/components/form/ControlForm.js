import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import formStyles from "./Form.module.css";
import { DarkModeContext } from "../layout/DarkModeContext";

import InputBlood from "./InputBlood";
import Select from "./Select";

function ControlForm({ handleSubmit, controlData, btnText }) {
  const [control, setControl] = useState(controlData || {});
  const bloodTypes = ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"];
  const reasons = ["Expurgo", "Doação"];
  const bloodDestinys = ["Hospital", "Clínica", "Hemocentro"];
  const receivers = ["Hemonúcleo", "Diretor Geral", "Funcionário"];
  const { isDarkMode } = useContext(DarkModeContext);
  const containerClassName = isDarkMode
    ? `${formStyles.form_container} ${formStyles["form_container-dark"]}`
    : formStyles.form_container;

  const navigate = useNavigate();

  function handleChange(e) {
    setControl({ ...control, [e.target.name]: e.target.value });
  }

  function handleBloodType(e) {
    setControl({
      ...control,
      bloodType: e.target.options[e.target.selectedIndex].text,
    });
  }

  function handleReason(e) {
    setControl({
      ...control,
      reason: e.target.options[e.target.selectedIndex].text,
    });
  }

  function handleBloodDestiny(e) {
    setControl({
      ...control,
      bloodDestiny: e.target.options[e.target.selectedIndex].text,
    });
  }

  function handleReceiver(e) {
    setControl({
      ...control,
      receiver: e.target.options[e.target.selectedIndex].text,
    });
  }

  function submit(e) {
    e.preventDefault();
    handleSubmit(control);
  }

  function handleCancel() {
    navigate("/registers");
  }

  return (
    <form className={containerClassName} onSubmit={submit}>
      <InputBlood
        text="Quantidade de Bolsas"
        type="number"
        name="bloodQuantity"
        placeholder="Informe a quantidade de bolsas"
        handleOnChange={handleChange}
        value={control.bloodQuantity || ""}
      />

      <Select
        text="Tipo Sanguíneo"
        type="text"
        name="bloodType"
        options={bloodTypes}
        handleOnChange={handleBloodType}
        value={control.bloodType || ""}
      />

      <Select
        text="Motivo"
        type="text"
        name="reason"
        options={reasons}
        handleOnChange={handleReason}
        value={control.reason || ""}
      />

      <Select
        text="Destino"
        type="text"
        name="bloodDestiny"
        options={bloodDestinys}
        handleOnChange={handleBloodDestiny}
        value={control.bloodDestiny || ""}
      />

      <Select
        text="Recebedor"
        type="text"
        name="receiver"
        options={receivers}
        handleOnChange={handleReceiver}
        value={control.receiver || ""}
      />

      <InputBlood
        text="Informações Adicionais"
        type="text"
        name="additionalInfo"
        placeholder="Descreva informações adicionais"
        handleOnChange={handleChange}
        value={control.additionalInfo || ""}
      />

      <div className={formStyles.button_container}>
        <input type="submit" value={btnText} />
        <input type="button" value="Cancelar" onClick={handleCancel} />
      </div>
    </form>
  );
}

export default ControlForm;
