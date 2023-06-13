import styles from "./Select.module.css";
import { DarkModeContext } from "../layout/DarkModeContext";
import { useContext } from "react";

function Select({ text, name, options, handleOnChange, value }) {
  const { isDarkMode } = useContext(DarkModeContext);

  const containerClassName = isDarkMode
    ? `${styles.form_control} ${styles["form_control-dark"]}`
    : styles.form_control;

  return (
    <div className={containerClassName}>
      <label htmlFor={name}>{text}:</label>
      <select
        name={name}
        id={name}
        onChange={handleOnChange}
        value={value || ""}
      >
        <option>Selecione uma opção:</option>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
