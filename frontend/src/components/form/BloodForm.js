import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import formStyles from "./Form.module.css";
import { DarkModeContext } from "../layout/DarkModeContext";

import InputBlood from "./InputBlood";
import Select from "./Select";

function BloodForm({ handleSubmit, bloodData, btnText }) {
  const [blood, setBlood] = useState(bloodData || {});
  const inventoryTypes = ["", "Entrada", "Saída"];
  const entryTypes = ["", "Doação", "Transferência"];
  const maritals = ["", "Solteiro", "Casado", "Viúvo"];
  const exitTypes = ["", "Expurgo", "Transfusão", "Vencimento"];
  const sexs = ["", "Feminino", "Masculino"];
  const bloodTypes = ["", "A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"];

  const navigate = useNavigate();
  const { isDarkMode } = useContext(DarkModeContext);

  const containerClassName = isDarkMode
    ? `${formStyles.form_container} ${formStyles["form_container-dark"]}`
    : formStyles.form_container;

  function handleChange(e) {
    setBlood({ ...blood, [e.target.name]: e.target.value });
  }

  function handleInventoryType(e) {
    setBlood({
      ...blood,
      inventoryType: e.target.options[e.target.selectedIndex].text,
    });
  }

  function handleMarital(e) {
    setBlood({
      ...blood,
      marital: e.target.options[e.target.selectedIndex].text,
    });
  }

  function handleSex(e) {
    setBlood({
      ...blood,
      sex: e.target.options[e.target.selectedIndex].text,
    });
  }

  function handleBloodType(e) {
    setBlood({
      ...blood,
      bloodType: e.target.options[e.target.selectedIndex].text,
    });
  }

  function handleEntryType(e) {
    setBlood({
      ...blood,
      entryType: e.target.options[e.target.selectedIndex].text,
    });
  }

  function handleExitType(e) {
    setBlood({
      ...blood,
      exitType: e.target.options[e.target.selectedIndex].text,
    });
  }

  function handleEntryFields() {
    return (
      <>
        <Select
          text="Tipo de Entrada"
          type="text"
          name="entryType"
          options={entryTypes}
          handleOnChange={handleEntryType}
          value={blood.entryType || ""}
        />
        {blood.entryType === "Doação" && (
          <>
            <InputBlood
              text="Nome do doador"
              type="text"
              name="donator"
              placeholder="Digite o nome do doador"
              handleOnChange={handleChange}
              value={blood.donator || ""}
            />
            <InputBlood
              text="Telefone do Doador"
              type="text"
              name="phone"
              placeholder="Digite o contato do doador"
              handleOnChange={handleChange}
              value={blood.phone || ""}
            />
            <InputBlood
              text="Idade do Doador"
              type="number"
              name="age"
              placeholder="Digite a idade do doador"
              handleOnChange={handleChange}
              value={blood.age || ""}
            />
            <Select
              text="Estado Civil"
              type="text"
              name="marital"
              options={maritals}
              handleOnChange={handleMarital}
              value={blood.marital || ""}
              required={false}
            />
            <Select
              text="Sexo"
              type="text"
              name="sex"
              options={sexs}
              handleOnChange={handleSex}
              value={blood.sex || ""}
            />
          </>
        )}
      </>
    );
  }

  function handleExitFields() {
    return (
      <>
        <Select
          text="Tipo de Saída"
          type="text"
          name="exitType"
          options={exitTypes}
          handleOnChange={handleExitType}
          value={blood.exitType || ""}
        />
        {blood.exitType === "Transfusão" && (
          <>
            <InputBlood
              text="Emitente"
              type="text"
              name="donorName"
              placeholder="Responsável pelo envio"
              handleOnChange={handleChange}
              value={blood.donorName || ""}
            />
            <InputBlood
              text="Destino da Saída"
              type="text"
              name="destination"
              placeholder="Informe onde será feita a saida"
              handleOnChange={handleChange}
              value={blood.destination || ""}
            />
            <InputBlood
              text="Recebedor"
              type="text"
              name="recipientName"
              placeholder="Nome de quem receberá"
              handleOnChange={handleChange}
              value={blood.recipientName || ""}
            />
          </>
        )}
      </>
    );
  }

  function submit(e) {
    e.preventDefault();
    handleSubmit(blood);
  }

  function handleCancel() {
    navigate("/bloods/donations");
  }

  return (
    <form onSubmit={submit} className={containerClassName}>
      <Select
        text="Tipo de registro"
        type="text"
        name="inventoryType"
        options={inventoryTypes}
        handleOnChange={handleInventoryType}
        value={blood.inventoryType || ""}
      />

      <Select
        text="Tipo Sanguíneo"
        type="text"
        name="bloodType"
        options={bloodTypes}
        handleOnChange={handleBloodType}
        value={blood.bloodType || ""}
      />

      <InputBlood
        text="Quantidade"
        type="number"
        name="quantity"
        handleOnChange={handleChange}
        value={blood.quantity || ""}
      />

      <InputBlood
        text="Notas sobre o registro"
        type="text"
        name="notes"
        placeholder="Adicione notas adicionais ao registro"
        handleOnChange={handleChange}
        value={blood.notes || ""}
        required={false}
      />

      {blood.inventoryType === "Entrada"
        ? handleEntryFields()
        : handleExitFields()}

      <div className={formStyles.button_container}>
        <input type="submit" value={btnText} />
        <input type="button" value="Cancelar" onClick={handleCancel} />
      </div>
    </form>
  );
}

export default BloodForm;
