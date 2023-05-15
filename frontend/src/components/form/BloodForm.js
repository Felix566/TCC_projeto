import { useState } from "react";

import formStyles from "./Form.module.css";

import Input from "./InputBlood";
import Select from "./Select";

function BloodForm({ handleSubmit, bloodData, btnText }) {
  const [blood, setBlood] = useState(bloodData || {});
  const maritals = ["Solteiro", "Casado", "Viúvo"];
  const sexs = ["Feminino", "Masculino"];
  const bloodTypes = ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"];

  function handleChange(e) {
    setBlood({ ...blood, [e.target.name]: e.target.value });
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

  function submit(e) {
    e.preventDefault();
    handleSubmit(blood);
  }

  return (
    <form onSubmit={submit} className={formStyles.form_container}>
      <Input
        text="Nome do doador"
        type="text"
        name="donator"
        placeholder="Digite o nome do doador"
        handleOnChange={handleChange}
        value={blood.donator || ""}
      />
      <Input
        text="CPF do doador"
        type="text"
        name="cpf"
        placeholder="Digite o CPF do doador"
        handleOnChange={handleChange}
        value={blood.cpf || ""}
      />
      <Input
        text="Data de Nascimento"
        type="date"
        name="nasc"
        handleOnChange={handleChange}
        value={blood.nasc || ""}
      />
      <Input
        text="Idade do Doador"
        type="number"
        name="age"
        placeholder="Digite a idade do doador"
        handleOnChange={handleChange}
        value={blood.age || ""}
      />
      <Input
        text="Telefone do Doador"
        type="text"
        name="phone"
        placeholder="Digite o contato do doador"
        handleOnChange={handleChange}
        value={blood.phone || ""}
      />
      <Select
        text="Estado Civil"
        type="text"
        name="marital"
        options={maritals}
        handleOnChange={handleMarital}
        value={blood.marital || ""}
      />
      <Select
        text="Sexo"
        type="text"
        name="sex"
        options={sexs}
        handleOnChange={handleSex}
        value={blood.sex || ""}
      />
      <Input
        text="Volume da Doação"
        type="text"
        name="bloodVolume"
        placeholder="Digite o volume doado"
        handleOnChange={handleChange}
        value={blood.bloodVolume || ""}
      />
      <Select
        text="Tipo Sanguíneo"
        type="text"
        name="bloodTypes"
        options={bloodTypes}
        handleOnChange={handleBloodType}
        value={blood.bloodType || ""}
      />
      <input type="submit" value={btnText} />
    </form>
  );
}

export default BloodForm;
