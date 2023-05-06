import { useState } from "react";

import formStyles from "./Form.module.css";

import Input from "./Input";
import Select from "./Select";

function BloodForm(handleSubmit, bloodData, btnText) {
  const [blood, setBlood] = useState(bloodData || {});
  const maritals = ["Solteiro", "Casado", "Viúvo"];
  const sexs = ["Feminino", "Masculino"];
  const bloodTypes = ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"];

  function handleChange(e) {}

  function handleMarital(e) {}

  /*donator string
  cpf string
  nasc date
  age number
  phone string
  marital string
  sex string
  bloodVolume string
  bloodType string*/

  return (
    <form className={formStyles.form_container}>
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
        name="marital"
        options={maritals}
        handleOnChange={handleMarital}
        value={blood.marital || ""}
      />
      <Input
        text="Volume da Doação"
        type="text"
        name="bloodVolume"
        placeholder="Digite o volume doado"
        handleOnChange={handleChange}
        value={blood.bloodVolume || ""}
      />
      <input type="submit" value={btnText} />
    </form>
  );
}

export default BloodForm;
