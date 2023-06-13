import api from "../../../utils/api";

import { useState, useEffect, useContext } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

import ReactPaginate from "react-paginate";

import styles from "./RegisterDashboard.module.css";
import { DarkModeContext } from "../../layout/DarkModeContext";

/* hooks */
import useFlashMessage from "../../../hooks/useFlashMessage";

function RegisterControl() {
  const [registers, setRegisters] = useState([]);
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
      .get("/controls/allControls", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setRegisters(response.data.controls);
      });
  }, [token]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const offset = currentPage * perPage;
  const paginatedControls = registers.slice(offset, offset + perPage);
  const pageCount = Math.ceil(registers.length / perPage);

  async function removeRegister(id) {
    let msgType = "success";

    const data = await api
      .delete(`/controls/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        const updatedControls = registers.filter(
          (control) => control._id !== id
        );
        setRegisters(updatedControls);
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  }
  return (
    <>
      <section>
        <div className={bloodListClassName}>
          <h1>Entradas Realizadas</h1>
          <div className={styles.actions}>
            <Link to="/control">
              <FaPlus className={styles.icon} />
              Adicionar Informações
            </Link>
          </div>
        </div>

        <div className={containerClassName}>
          {paginatedControls.length > 0 && (
            <table className={styles.bloodlist_table}>
              <thead>
                <tr>
                  <th>Quantidade de Bolsas</th>
                  <th>Tipo Sanguíneo</th>
                  <th>Funcionário</th>
                  <th>Motivo</th>
                  <th>Destino</th>
                  <th>Recebedor</th>
                  <th>Data da Doação</th>
                  <th>Hora da Doação</th>
                  <th>Informações Adicionais</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {paginatedControls.map((control) => (
                  <tr key={control._id}>
                    <td>{control.bloodQuantity}</td>
                    <td>{control.bloodType}</td>
                    <td>{control.user.name}</td>
                    <td>{control.reason}</td>
                    <td>{control.bloodDestiny}</td>
                    <td>{control.receiver}</td>
                    <td>{new Date(control.createdAt).toLocaleDateString()}</td>
                    <td>{new Date(control.createdAt).toLocaleTimeString()}</td>
                    <td>{control.additionalInfo}</td>
                    <td>
                      <div className={styles.actions}>
                        <Link to={`/controls/edit/${control._id}`}>
                          <FaEdit className={styles.icon} /> Editar
                        </Link>
                        <button
                          onClick={() => {
                            removeRegister(control._id);
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
          {paginatedControls.length === 0 && (
            <p>Ainda não há entradas registradas!</p>
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

      <section>
        <div className={bloodListClassName}>
          <h1>Saídas Realizadas</h1>
          <div className={styles.actions}>
            <Link to="/control">
              <FaPlus className={styles.icon} />
              Adicionar Informações
            </Link>
          </div>
        </div>

        <div className={containerClassName}>
          {paginatedControls.length > 0 && (
            <table className={styles.bloodlist_table}>
              <thead>
                <tr>
                  <th>Quantidade de Bolsas</th>
                  <th>Tipo Sanguíneo</th>
                  <th>Funcionário</th>
                  <th>Motivo</th>
                  <th>Destino</th>
                  <th>Recebedor</th>
                  <th>Data da Doação</th>
                  <th>Hora da Doação</th>
                  <th>Informações Adicionais</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {paginatedControls.map((control) => (
                  <tr key={control._id}>
                    <td>{control.bloodQuantity}</td>
                    <td>{control.bloodType}</td>
                    <td>{control.user.name}</td>
                    <td>{control.reason}</td>
                    <td>{control.bloodDestiny}</td>
                    <td>{control.receiver}</td>
                    <td>{new Date(control.createdAt).toLocaleDateString()}</td>
                    <td>{new Date(control.createdAt).toLocaleTimeString()}</td>
                    <td>{control.additionalInfo}</td>
                    <td>
                      <div className={styles.actions}>
                        <Link to={`/controls/edit/${control._id}`}>
                          <FaEdit className={styles.icon} /> Editar
                        </Link>
                        <button
                          onClick={() => {
                            removeRegister(control._id);
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
          {paginatedControls.length === 0 && (
            <p>Ainda não há saídas registradas!</p>
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
    </>
  );
}

export default RegisterControl;
