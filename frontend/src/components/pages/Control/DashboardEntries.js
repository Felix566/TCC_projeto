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
  const [entries, setEntries] = useState([]);
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
      .get("/entries/inputs", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setEntries(response.data.entries);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const offset = currentPage * perPage;
  const paginatedEntries = entries.slice(offset, offset + perPage);
  const entriesPageCount = Math.ceil(entries.length / perPage);

  async function removeEntry(id) {
    let msgType = "success";

    const data = await api
      .delete(`/entries/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        const updatedEntries = entries.filter((entry) => entry._id !== id);
        setEntries(updatedEntries);
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
          <Link to="/createInput">
            <FaPlus className={styles.icon} />
            Adicionar Entrada
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
                <th>Quantidade de Bolsas</th>
                <th>Tipo Sanguíneo</th>
                <th>Doador</th>
                <th>Tipo de Entrada</th>
                <th>Destino</th>
                <th>Rsponsável</th>
                <th>Data</th>
                <th>Horário</th>
                <th>Observações</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEntries.map((entry) => (
                <tr key={entry._id}>
                  <td>{entry.bloodQuantity}</td>
                  <td>{entry.bloodType}</td>
                  <td>{entry.donorName}</td>
                  <td>{entry.entryType}</td>
                  <td>{entry.destination}</td>
                  <td>{entry.user.name}</td>
                  <td>{new Date(entry.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(entry.createdAt).toLocaleTimeString()}</td>
                  <td>{entry.entryNotes}</td>
                  <td>
                    <div className={styles.actions}>
                      <Link to={`/entries/edit/${entry._id}`}>
                        <FaEdit className={styles.icon} /> Editar
                      </Link>
                      <button
                        onClick={() => {
                          removeEntry(entry._id);
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
