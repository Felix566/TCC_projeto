import api from "../../../utils/api";

import { useState, useEffect, useContext } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { HiArrowDownTray } from "react-icons/hi2";
import { Link } from "react-router-dom";

import ReactPaginate from "react-paginate";

import styles from "./RegisterDashboard.module.css";
import { DarkModeContext } from "../../layout/DarkModeContext";

/* hooks */
import useFlashMessage from "../../../hooks/useFlashMessage";

function DashboardExits() {
  const [bloods, setBloods] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage] = useState(5);
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();

  const { isDarkMode } = useContext(DarkModeContext);
  const bloodListClassName = isDarkMode
    ? `${styles.bloodlist_header} ${styles.dark}`
    : styles.bloodlist_header;
  const containerClassName = isDarkMode
    ? `${styles.bloodlist_container} ${styles.dark}`
    : styles.bloodlist_container;

  useEffect(() => {
    api
      .get("/bloods", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setBloods(response.data.bloods);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  //filtrar os registros com inventoryType igual a "Saída"
  const filteredExits = bloods.filter(
    (blood) => blood.inventoryType === "Saída"
  );

  const offset = currentPage * perPage;
  const paginatedExits = filteredExits.slice(offset, offset + perPage);
  const exitsPageCount = Math.ceil(filteredExits.length / perPage);

  async function removeExits(id) {
    let msgType = "success";

    const data = await api
      .delete(`/bloods/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        const updatedExits = bloods.filter((blood) => blood._id !== id);
        setBloods(updatedExits);
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  }

  return (
    <section>
      <div className={bloodListClassName}>
        <h1>Saídas Realizadas</h1>
        <div className={styles.actions}>
          <Link to="/bloods/add">
            <FaPlus className={styles.icon} />
            Adicionar
          </Link>
          <Link to="/entries">
            <HiArrowDownTray className={styles.icon} />
            Registros de Entradas
          </Link>
        </div>
      </div>

      <div className={containerClassName}>
        {paginatedExits.length > 0 && (
          <table className={styles.bloodlist_table}>
            <thead>
              <tr>
                <th>Quantidade</th>
                <th>Tipagem</th>
                <th>Motivo da Saída</th>
                <th>Destino</th>
                <th>Data</th>
                <th>Horário</th>
                <th>Responsável</th>
                <th>Notas</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedExits.map((blood) => (
                <tr key={blood._id}>
                  <td>{blood.quantity}</td>
                  <td>{blood.bloodType}</td>
                  <td>{blood.exitType}</td>
                  <td>
                    {blood.destination !== undefined && blood.destination !== ""
                      ? blood.destination
                      : "-----"}
                  </td>
                  <td>{new Date(blood.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(blood.createdAt).toLocaleTimeString()}</td>
                  <td>{blood.user.name}</td>
                  <td>{blood.notes}</td>
                  <td>
                    <div className={styles.actions}>
                      <Link to={`/bloods/edit/${blood._id}`}>
                        <FaEdit className={styles.icon} /> Editar
                      </Link>
                      <button
                        onClick={() => {
                          removeExits(blood._id);
                        }}
                      >
                        <FaTrash className={styles.icon} color="red" />
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {paginatedExits.length === 0 && <p>Ainda não há saídas registradas!</p>}
        <ReactPaginate
          previousLabel="< Anterior"
          nextLabel="Próxima >"
          breakLabel="..."
          breakClassName={styles.pagination_break}
          pageCount={exitsPageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={4}
          onPageChange={handlePageChange}
          containerClassName={styles.pagination}
          pageClassName={styles.pagination_page}
          previousClassName={styles.pagination_previous}
          nextClassName={styles.pagination_next}
          activeClassName={styles.pagination_active}
          renderOnZeroPageCount={null}
        />
      </div>
    </section>
  );
}

export default DashboardExits;
