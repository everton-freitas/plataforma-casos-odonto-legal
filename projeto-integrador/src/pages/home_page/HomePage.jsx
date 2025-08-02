import Header from "../../components/header/Header";
import Nav from "../../components/nav/Nav";
import styles from "./HomePage.module.css";
import MapaD3Geojson from "../../components/map/MapComponent";
import CasesBarChart from "../../components/bar_charts/CasesBarCharts";
import PieCharts from "../../components/pie_chart/PieCharts";
import VictimsStatusDoughnut from "../../components/doughnut_chart/DoughnutChart";
import React, { useState, useEffect } from "react";
import RoscaChart from "../../components/RoscaChart";
import DistribuicaoChart from "../../components/DistribuicaoChart";
import ModeloChart from "../../components/ModeloChart";

const Inicio = () => {
  const [dadosCasos, setDadosCasos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  // Busca os dados principais da aplicação
  useEffect(() => {
    async function carregarDados() {
      try {
        setLoading(true);
        const res = await fetch(
          "https://back-trab-dados.onrender.com/api/casos"
        );
        const data = await res.json();
        setDadosCasos(data);
      } catch (erro) {
        console.error("Erro ao carregar dados:", erro);
        alert("Não foi possível carregar os dados principais.");
      } finally {
        setLoading(false);
      }
    }
    carregarDados();
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <div>
        <Nav />
        <div className={styles.marginContent}>
          <div className={styles.container}>
            <h1 className={styles.title}>Banco Odonto-Legal</h1>
            <div className={styles.row}>
              <div className={`${styles.dataCard} ${styles.revenueCard}`}>
                <MapaD3Geojson />
              </div>
              <div className={`${styles.dataCard} ${styles.customerCard}`}>
                <CasesBarChart />
              </div>
            </div>
            <div className={styles.row}>
              <div className={`${styles.dataCard} ${styles.categoryCard}`}>
                <PieCharts />
              </div>
              <div className={`${styles.dataCard} ${styles.categoryCard}`}>
                <VictimsStatusDoughnut />
              </div>
            </div>

            <div className={styles.row}>
              <div className={`${styles.dataCard} ${styles.categoryCard}`}>
                <label htmlFor="dataInicio">Período de:</label>
                <input
                  type="date"
                  id="dataInicio"
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
                />
                <label htmlFor="dataFim">até:</label>
                <input
                  type="date"
                  id="dataFim"
                  value={dataFim}
                  onChange={(e) => setDataFim(e.target.value)}
                />

{/*                 {loading ? (
                  <p>Carregando gráficos...</p>
                ) : (
                  <>
                    <div className={styles.space}>
                      <div
                        className={`${styles.dataCard} ${styles.categoryCard}`}
                      >
                        <DistribuicaoChart
                          allData={dadosCasos}
                          dataInicio={dataInicio}
                          dataFim={dataFim}
                        />
                      </div>

                      <div
                        className={`${styles.dataCard} ${styles.categoryCard}`}
                      >
                        <ModeloChart />
                      </div>
                      <div
                        className={`${styles.dataCard} ${styles.categoryCard}`}
                      >
                        <RoscaChart
                          allData={dadosCasos}
                          dataInicio={dataInicio}
                          dataFim={dataFim}
                        />
                      </div>
                    </div>
                  </>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
