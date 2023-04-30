import { Link } from "react-router-dom";
import { useContext } from "react";

import { GoHome, GoSignIn, GoSignOut } from "react-icons/go";
import { IoPersonAddSharp } from "react-icons/io5";
import { BsPersonVcard } from "react-icons/bs";

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
          <GoHome size={22} color="white" />
          <Link to="/">Home</Link>
        </li>
        {authenticated ? (
          <>
            <li>
              <BsPersonVcard size={22} color="white" />
              <Link to="/user/profile">Perfil</Link>
            </li>

            <li onClick={logout}>Sair</li>
            <GoSignOut size={22} color="white" />
          </>
        ) : (
          <>
            <li>
              <GoSignIn size={22} color="white" />
              <Link to="/Login">Entrar</Link>
            </li>
            <li>
              <IoPersonAddSharp size={22} color="white" />
              <Link to="/register">Cadastrar</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
