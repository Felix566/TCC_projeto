import React from "react";
import styles from "./Input.module.css";

function InputBlood({
  type,
  text,
  name,
  placeholder,
  required = true,
  handleOnChange,
  value,
}) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        required={required}
      />
    </div>
  );
}

export default InputBlood;
