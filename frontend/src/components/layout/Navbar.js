import { Link } from "react-router-dom";

import styles from "./Navbar.module.css";

import Logo from "../../assets/img/doacao.png";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={Logo} alt="doação logo" />
        <h2>Projeto TCC</h2>
      </div>
      <div className={styles.navbar_menu_links}>
        <ul className={styles.nav_links}>
          <li>
            <Link to="/">Usuários</Link>
          </li>
          <li>
            <Link to="/Login">Entrar</Link>
          </li>
          <li>
            <Link to="/register">Cadastrar</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
