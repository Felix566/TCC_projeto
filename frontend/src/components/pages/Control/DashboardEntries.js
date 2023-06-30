import api from "../../../utils/api";

import { useState, useEffect, useContext } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { HiArrowUpTray } from "react-icons/hi2";
import { Link } from "react-router-dom";

import ReactPaginate from "react-paginate";

import styles from "./RegisterDashboard.module.css";
import { DarkModeContext } from "../../layout/DarkModeContext";

/* hooks */
import useFlashMessage from "../../../hooks/useFlashMessage";

function DashboardEntries() {
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

  //filtrar os registros com inventoryType igual a "Entrada"
  const filteredEntries = bloods.filter(
    (blood) => blood.inventoryType === "Entrada"
  );

  const offset = currentPage * perPage;
  const paginatedEntries = filteredEntries.slice(offset, offset + perPage);
  const entriesPageCount = Math.ceil(filteredEntries.length / perPage);

  async function removeEntry(id) {
    let msgType = "success";

    const data = await api
      .delete(`/bloods/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        const updatedEntries = bloods.filter((blood) => blood._id !== id);
        setBloods(updatedEntries);
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
        <h1>Entradas Realizadas</h1>
        <div className={styles.actions}>
          <Link to="/bloods/add">
            <FaPlus className={styles.icon} />
            Adicionar
          </Link>
          <Link to="/exits">
            <HiArrowUpTray className={styles.icon} />
            Registros de Saídas
          </Link>
        </div>
      </div>

      <div className={containerClassName}>
        {paginatedEntries.length > 0 && (
          <table className={styles.bloodlist_table}>
            <thead>
              <tr>
                <th>Quantidade</th>
                <th>Tipagem</th>
                <th>Motivo da Entrada</th>
                <th>Doador</th>
                <th>Responsável</th>
                <th>Data</th>
                <th>Horário</th>
                <th>Notas</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEntries.map((blood) => (
                <tr key={blood._id}>
                  <td>{blood.quantity}</td>
                  <td>{blood.bloodType}</td>
                  <td>{blood.entryType}</td>
                  <td>
                    {blood.donator !== undefined && blood.donator !== ""
                      ? blood.donator
                      : "-----"}
                  </td>
                  <td>{blood.user.name}</td>
                  <td>{new Date(blood.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(blood.createdAt).toLocaleTimeString()}</td>
                  <td>{blood.notes}</td>
                  <td>
                    <div className={styles.actions}>
                      <Link to={`/bloods/edit/${blood._id}`}>
                        <FaEdit className={styles.icon} /> Editar
                      </Link>
                      <button
                        onClick={() => {
                          removeEntry(blood._id);
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
        {paginatedEntries.length === 0 && (
          <p>Ainda não há entradas registradas!</p>
        )}
        <ReactPaginate
          previousLabel="< Anterior"
          nextLabel="Próxima >"
          breakLabel="..."
          breakClassName={styles.pagination_break}
          pageCount={entriesPageCount}
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

export default DashboardEntries;
