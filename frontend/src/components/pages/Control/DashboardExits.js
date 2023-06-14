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
  const [exits, setExits] = useState([]);
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
      .get("/exits/outputs", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setExits(response.data.exits);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const offset = currentPage * perPage;
  const paginatedExits = exits.slice(offset, offset + perPage);
  const exitsPageCount = Math.ceil(exits.length / perPage);

  async function removeExits(id) {
    let msgType = "success";

    const data = await api
      .delete(`/exits/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        const updatedExits = exits.filter((exit) => exit._id !== id);
        setExits(updatedExits);
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
          <Link to="/createOutput">
            <FaPlus className={styles.icon} />
            Adicionar Saída
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
                <th>Quantidade de Bolsas</th>
                <th>Tipo Sanguíneo</th>
                <th>Recebedor</th>
                <th>Tipo de Saída</th>
                <th>Destino</th>
                <th>Responsável</th>
                <th>Data</th>
                <th>Horário</th>
                <th>Observações</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedExits.map((exit) => (
                <tr key={exit._id}>
                  <td>{exit.bloodQuantity}</td>
                  <td>{exit.bloodType}</td>
                  <td>{exit.recipientName}</td>
                  <td>{exit.exitType}</td>
                  <td>{exit.destination}</td>
                  <td>{exit.user.name}</td>
                  <td>{new Date(exit.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(exit.createdAt).toLocaleTimeString()}</td>
                  <td>{exit.exitNotes}</td>
                  <td>
                    <div className={styles.actions}>
                      <Link to={`/exits/edit/${exit._id}`}>
                        <FaEdit className={styles.icon} /> Editar
                      </Link>
                      <button
                        onClick={() => {
                          removeExits(exit._id);
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
