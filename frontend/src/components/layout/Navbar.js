import { Link } from "react-router-dom";

import Logo from "../../assets/img/doacao.png";

function Navbar() {
  return (
    <nav>
      <div>
        <img src={Logo} alt="doação logo" />
        <h2>Projeto TCC</h2>
      </div>
      <ul>
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
    </nav>
  );
}

export default Navbar;
