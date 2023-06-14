import { Link } from "react-router-dom";
import React, { useContext } from "react";

import { GoHome, GoSignIn, GoSignOut } from "react-icons/go";
import { IoPersonAddSharp } from "react-icons/io5";
import { BsPersonVcard } from "react-icons/bs";
import { BiDonateBlood } from "react-icons/bi";
import { FaExchangeAlt } from "react-icons/fa";

import { FiSun } from "react-icons/fi";
import { IoMoon } from "react-icons/io5";

import styles from "./Navbar.module.css";
import { DarkModeContext } from "./DarkModeContext";

import Logo from "../../assets/img/doacao.png";

/* context */
import { Context } from "../../context/UserContext";

function Navbar() {
  const { authenticated, logout } = useContext(Context);
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  const navbarClassName = isDarkMode
    ? `${styles.navbar} ${styles["navbar-dark"]}`
    : styles.navbar;

  return (
    <nav className={navbarClassName}>
      <div className={styles.navbar_logo}>
        <img src={Logo} alt="doação logo" />
        <h2>Projeto TCC</h2>
      </div>
      <ul>
        {authenticated ? (
          <>
            <li>
              <GoHome size={22} color="white" />
              <Link to="/home">Home</Link>
            </li>

            <li>
              <BiDonateBlood size={22} color="white" />
              <Link to="/bloods/donations">Doações</Link>
            </li>

            <li>
              <FaExchangeAlt size={22} color="white" />
              <Link to="/entries">Entradas e Saídas</Link>
            </li>

            <li>
              <BsPersonVcard size={22} color="white" />
              <Link to="/user/profile">Perfil</Link>
            </li>

            <li onClick={logout}>
              <GoSignOut size={22} color="white" />
              <Link to="/">Sair</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <GoSignIn size={22} color="white" />
              <Link to="/">Entrar</Link>
            </li>
            <li>
              <IoPersonAddSharp size={22} color="white" />
              <Link to="/register">Cadastrar</Link>
            </li>
          </>
        )}
      </ul>
      <div className={styles.darkModeToggle} onClick={toggleDarkMode}>
        {isDarkMode ? (
          <>
            <FiSun size={22} color="#ffbf00" />
            <span>Modo Claro</span>
          </>
        ) : (
          <>
            <IoMoon size={22} color="#d9dcd6" />
            <span>Modo Escuro</span>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
