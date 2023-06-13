import React, { useContext } from "react";
import styles from "./Footer.module.css";
import { DarkModeContext } from "./DarkModeContext";

const Footer = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  const footerClassName = isDarkMode
    ? `${styles.footer} ${styles["footer-dark"]}`
    : styles.footer;
  return (
    <footer className={footerClassName}>
      <p>
        <span>Projeto TCC</span> &copy; 2023
      </p>
    </footer>
  );
};

export default Footer;
