import { Link } from "react-router-dom";
import { useContext } from "react";

import { FaUserCircle, FaArrowRight, FaRegistered } from "react-icons/fa";

import styles from "./Navbar.module.css";

import Logo from "../../assets/img/doacao.png";

/* context */
import { Context } from "../../context/UserContext";

function Navbar() {
  const { authenticated, logout } = useContext(Context);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={Logo} alt="doação logo" />
        <h2>Projeto TCC</h2>
      </div>
      <ul>
        <li>
          <FaUserCircle />
          <Link to="/">Usuários</Link>
        </li>
        {authenticated ? (
          <>
            <li onClick={logout}>Sair</li>
          </>
        ) : (
          <>
            <li>
              <Link to="/Login">Entrar</Link>
              <FaArrowRight />
            </li>
            <li>
              <Link to="/register">Cadastrar</Link>
              <FaRegistered />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
