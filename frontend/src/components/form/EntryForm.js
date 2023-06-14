import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import formStyles from "./Form.module.css";
import { DarkModeContext } from "../layout/DarkModeContext";

import InputBlood from "./InputBlood";
import Select from "./Select";

function EntryForm({ handleSubmit, entryData, btnText }) {
  const [entry, setEntry] = useState(entryData || {});
  const bloodTypes = ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"];
  const entryTypes = ["Doação", "Transferência"];

  const { isDarkMode } = useContext(DarkModeContext);
  const containerClassName = isDarkMode
    ? `${formStyles.form_container} ${formStyles["form_container-dark"]}`
    : formStyles.form_container;

  const navigate = useNavigate();

  function handleChange(e) {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  }

  function handleBloodType(e) {
    setEntry({
      ...entry,
      bloodType: e.target.options[e.target.selectedIndex].text,
    });
  }

  function handleEntryType(e) {
    setEntry({
      ...entry,
      entryType: e.target.options[e.target.selectedIndex].text,
    });
  }

  function submit(e) {
    e.preventDefault();
    handleSubmit(entry);
  }

  function handleCancel() {
    navigate("/entries");
  }
  return (
    <form className={containerClassName} onSubmit={submit}>
      <InputBlood
        text="Quantidade de Bolsas"
        type="number"
        name="bloodQuantity"
        placeholder="Informe a quantidade de bolsas"
        handleOnChange={handleChange}
        value={entry.bloodQuantity || ""}
      />

      <Select
        text="Tipo Sanguíneo"
        type="text"
        name="bloodType"
        options={bloodTypes}
        handleOnChange={handleBloodType}
        value={entry.bloodType || ""}
      />

      <Select
        text="Tipo de Entrada"
        type="text"
        name="entryType"
        options={entryTypes}
        handleOnChange={handleEntryType}
        value={entry.entryType || ""}
      />

      <InputBlood
        text="Nome do Doador"
        type="text"
        name="donorName"
        placeholder="Informe o nome do Doador"
        handleOnChange={handleChange}
        value={entry.donorName || ""}
      />

      <InputBlood
        text="Destino da Doação"
        type="text"
        name="destination"
        placeholder="Informe onde será destinado a doação"
        handleOnChange={handleChange}
        value={entry.destination || ""}
      />

      <InputBlood
        text="Notas sobre a Entrada"
        type="text"
        name="entryNotes"
        placeholder="Adicione notas adicionais ao cadastro"
        handleOnChange={handleChange}
        value={entry.entryNotes || ""}
      />

      <div className={formStyles.button_container}>
        <input type="submit" value={btnText} />
        <input type="button" value="Cancelar" onClick={handleCancel} />
      </div>
    </form>
  );
}

export default EntryForm;
