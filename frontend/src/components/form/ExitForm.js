import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import formStyles from "./Form.module.css";
import { DarkModeContext } from "../layout/DarkModeContext";

import InputBlood from "./InputBlood";
import Select from "./Select";

function ExitForm({ handleSubmit, exitData, btnText }) {
  const [exit, setExit] = useState(exitData || {});
  const bloodTypes = ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"];
  const exitTypes = ["Expurgo", "Transfusão", "Vencimento"];

  const { isDarkMode } = useContext(DarkModeContext);
  const containerClassName = isDarkMode
    ? `${formStyles.form_container} ${formStyles["form_container-dark"]}`
    : formStyles.form_container;

  const navigate = useNavigate();

  function handleChange(e) {
    setExit({ ...exit, [e.target.name]: e.target.value });
  }

  function handleBloodType(e) {
    setExit({
      ...exit,
      bloodType: e.target.options[e.target.selectedIndex].text,
    });
  }

  function handleExitType(e) {
    setExit({
      ...exit,
      exitType: e.target.options[e.target.selectedIndex].text,
    });
  }

  function submit(e) {
    e.preventDefault();
    handleSubmit(exit);
  }

  function handleCancel() {
    navigate("/exits");
  }

  return (
    <form className={containerClassName} onSubmit={submit}>
      <InputBlood
        text="Quantidade de Bolsas"
        type="number"
        name="bloodQuantity"
        placeholder="Informe a quantidade de bolsas"
        handleOnChange={handleChange}
        value={exit.bloodQuantity || ""}
      />

      <Select
        text="Tipo Sanguíneo"
        type="text"
        name="bloodType"
        options={bloodTypes}
        handleOnChange={handleBloodType}
        value={exit.bloodType || ""}
      />

      <Select
        text="Tipo de Saída"
        type="text"
        name="exitType"
        options={exitTypes}
        handleOnChange={handleExitType}
        value={exit.exitType || ""}
      />

      <InputBlood
        text="Nome do Receptor"
        type="text"
        name="recipientName"
        placeholder="Informe o nome do Recebedor"
        handleOnChange={handleChange}
        value={exit.recipientName || ""}
      />

      <InputBlood
        text="Destino da Saída"
        type="text"
        name="destination"
        placeholder="Informe onde será feita a saida"
        handleOnChange={handleChange}
        value={exit.destination || ""}
      />

      <InputBlood
        text="Notas sobre a Saída"
        type="text"
        name="exitNotes"
        placeholder="Adicione notas adicionais ao cadastro"
        handleOnChange={handleChange}
        value={exit.exitNotes || ""}
      />

      <div className={formStyles.button_container}>
        <input type="submit" value={btnText} />
        <input type="button" value="Cancelar" onClick={handleCancel} />
      </div>
    </form>
  );
}

export default ExitForm;
