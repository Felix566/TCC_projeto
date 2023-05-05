import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/* hooks */
import { useFlahMessage } from "../../../hooks/useFlashMessage";

function Donations() {
  const [bloods, setBloods] = useState([]);

  return (
    <section>
      <div>
        <h1>Doações Diárias</h1>
        <Link to="/blood/add">Adicionar Bolsas</Link>
      </div>

      <div>
        {bloods.length > 0 && <p>Doações adicionadas</p>}
        {bloods.length === 0 && <p>Ainda não há doações adicionadas!</p>}
      </div>
    </section>
  );
}

export default Donations;
