import api from "../../../utils/api";

import { useState, useEffect, useContext } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

import ReactPaginate from "react-paginate";

import styles from "./Dashboard.module.css";
import { DarkModeContext } from "../../layout/DarkModeContext";

/* hooks */
import useFlashMessage from "../../../hooks/useFlashMessage";

function Donations() {
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
      });
  }, [token]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const offset = currentPage * perPage;
  const paginatedBloods = bloods.slice(offset, offset + perPage);
  const pageCount = Math.ceil(bloods.length / perPage);

  async function removeBlood(id) {
    let msgType = "success";

    const data = await api
      .delete(`/bloods/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        const updatedBloods = bloods.filter((blood) => blood._id !== id);
        setBloods(updatedBloods);
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
        <h1>Doações Diárias</h1>
        <div className={styles.actions}>
          <Link to="/bloods/add">
            <FaPlus className={styles.icon} />
            Adicionar Bolsas
          </Link>
        </div>
      </div>

      <div className={containerClassName}>
        {paginatedBloods.length > 0 && (
          <table className={styles.bloodlist_table}>
            <thead>
              <tr>
                <th>Nome do Doador</th>
                <th>Tipo Sanguíneo</th>
                <th>Funcionário</th>
                <th>Data da Doação</th>
                <th>Hora da Doação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBloods.map((blood) => (
                <tr key={blood._id}>
                  <td>{blood.donator}</td>
                  <td>{blood.bloodType}</td>
                  <td>{blood.user.name}</td>
                  <td>{new Date(blood.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(blood.createdAt).toLocaleTimeString()}</td>
                  <td>
                    <div className={styles.actions}>
                      <Link to={`/bloods/edit/${blood._id}`}>
                        <FaEdit className={styles.icon} /> Editar
                      </Link>
                      <button
                        onClick={() => {
                          removeBlood(blood._id);
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
        {paginatedBloods.length === 0 && (
          <p>Ainda não há doações adicionadas!</p>
        )}
        <ReactPaginate
          previousLabel="< Anterior"
          nextLabel="Próxima >"
          breakLabel="..."
          breakClassName={styles.pagination_break}
          pageCount={pageCount}
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

export default Donations;
