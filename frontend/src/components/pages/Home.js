import api from "../../utils/api";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./Home.module.css";
import { FaPlus, FaHandHoldingHeart, FaExchangeAlt } from "react-icons/fa";

function Home() {
  const [bloodStock, setBloodStock] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBloodStock = async () => {
      try {
        const response = await api.get("/bloods");
        const stockData = response.data.bloods;
        const stockCounts = countBloodStock(stockData);
        setBloodStock(stockCounts);
      } catch (error) {
        setError("Ocorreu um erro ao carregar os dados de estoque sanguíneo.");
      }
    };

    fetchBloodStock();
  }, []);

  const countBloodStock = (stockData) => {
    const counts = {};

    //Lista de todos os tipos sanguíneos
    const bloodTypes = ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"];

    //Iniciar as quantidades como 0 para todos os tipos sanguíneos
    bloodTypes.forEach((bloodType) => {
      counts[bloodType] = 0;
    });

    //Contar a quantidade de cada tipo sanguíneo com base nos dados da API
    stockData.forEach((blood) => {
      const { bloodType } = blood;
      counts[bloodType] += 1;
    });

    return counts;
  };

  const positiveBloodTypes = Object.keys(bloodStock).filter((bloodType) =>
    bloodType.includes("+")
  );

  const negativeBloodTypes = Object.keys(bloodStock).filter((bloodType) =>
    bloodType.includes("-")
  );

  return (
    <section>
      <div className={styles.blood_home_header}>
        <h1>Estoque Sanguíneo</h1>
        <p>Verifique a quantidade de cada tipo sanguíneo</p>
      </div>

      {error ? (
        <p>{error}</p>
      ) : (
        <div className={styles.blood_container}>
          <div
            className={`${styles.blood_group} ${styles.blood_group_positive}`}
          >
            <table className={styles.blood_table}>
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Quantidade em Estoque</th>
                </tr>
              </thead>
              <tbody>
                {positiveBloodTypes.map((bloodType) => (
                  <tr key={bloodType}>
                    <td>{bloodType}</td>
                    <td>{bloodStock[bloodType]}</td>
                  </tr>
                ))}

                {negativeBloodTypes.map((bloodType) => (
                  <tr key={bloodType}>
                    <td>{bloodType}</td>
                    <td>{bloodStock[bloodType]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.buttons_container}>
            <div className={styles.button_content}>
              <Link
                to="/bloods/add"
                className={`${styles.button} ${styles.button_blue}`}
              >
                <FaPlus className={styles.button_icon} />
                <span>Adicionar Bolsas</span>
              </Link>
            </div>

            <div className={styles.button_content}>
              <Link
                to="/bloods/donations"
                className={`${styles.button} ${styles.button_red}`}
              >
                <FaHandHoldingHeart className={styles.button_icon} />
                <span>Doações Diárias</span>
              </Link>
            </div>

            <div className={styles.button_content}>
              <Link
                to="/bloodsManagement"
                className={`${styles.button} ${styles.button_yellow}`}
              >
                <FaExchangeAlt className={styles.button_icon} />
                <span>Controle de Entradas e Saídas</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Home;
