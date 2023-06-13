import React, { useState, useEffect, useContext } from "react";
import bus from "../../utils/bus";

import { DarkModeContext } from "./DarkModeContext";

import styles from "./Message.module.css";

function Message() {
  const { isDarkMode } = useContext(DarkModeContext);
  const containerClassName = isDarkMode
    ? `${styles.message} ${styles["dark"]}`
    : styles.message;
  let [visibility, setVisibility] = useState(false);
  let [message, setMessage] = useState("");
  let [type, setType] = useState("");

  useEffect(() => {
    bus.addListener("flash", ({ message, type }) => {
      setVisibility(true);
      setMessage(message);
      setType(type);

      setTimeout(() => {
        setVisibility(false);
      }, 4000);
    });
  }, []);

  return (
    visibility && (
      <div className={`${containerClassName} ${styles[type]}`}>{message}</div>
    )
  );
}

export default Message;
