import React, { useRef, useState } from "react";
import Breadcrumb from "common/Breadcrumb";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { FaAngleRight } from "react-icons/fa";
import { FaFile } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import { groupBy } from "utils/groupBy";
import { Bar } from "react-chartjs-2";
import LoaderSpinner from "common/LoaderSpinner";
import MyDocument from "./PDFOnsiteSalesInform";
import Viewer from "../ProductSales/components/PDFModalViewer";
import dateText from "utils/DateFormat/dateText";

const PORT = require("../../../config");

const OnsiteSalesInform = ({ permissionsAccess, user }) => {
  const informDate = useRef();
  const informDescription = useRef();
  const [dataSales, setDataSales] = useState(null);
  const [loading, setLoading] = useState(false);
  const [MyDoc, setMyDoc] = useState("");
  const [showPdf, setShowPDF] = useState(false);
  const [dataChart, setDataChart] = useState({
    type: "bar",
    labels: ["Turno mañana", "Turno tarde", "Turno noche"],
    datasets: [
      {
        label: "monto recaudado en efectivo",
        data: [],
        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
      {
        label: "monto recaudado con tarjeta",
        data: [],
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  });

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const generateInform = () => {
    setLoading(true);
    if (informDate.current.value !== "") {
      axios
        .get(`${PORT()}/api/onSiteSales?day=${informDate.current.value}`)
        .then(({ data }) => {
          let dataSalesPerPayType = groupBy(data, "name");
          let newDataChart = { ...dataChart };
          Object.values(dataSalesPerPayType).forEach(
            (dataSalePerPayType, i) => {
              let amount = [0, 0, 0];
              dataSalePerPayType.forEach((dataSale) => {
                let hour = parseInt(dataSale.hour.slice(0, 2));
                if (hour < 12) {
                  amount[0] = amount[0] + dataSale.total_amount;
                } else if (hour < 19) {
                  amount[1] = amount[1] + dataSale.total_amount;
                } else {
                  amount[2] = amount[2] + dataSale.total_amount;
                }
              });
              newDataChart.datasets[i].data = amount;
              setDataChart(newDataChart);
            }
          );
          if (data.length === 0) {
            setMyDoc("");
            let newDataChart = { ...dataChart };
            newDataChart.datasets[0].data = [0, 0, 0];
            newDataChart.datasets[1].data = [0, 0, 0];
            setDataChart(newDataChart);
            setDataSales([]);
          } else {
            setDataSales(dataSalesPerPayType);
            setMyDoc(
              <MyDocument
                user={user}
                title={
                  "(" + dateText(informDate.current.value, true, true) + ")"
                }
                description={informDescription.current.value}
                chart={newDataChart}
                salesData={dataSalesPerPayType}
              />
            );
          }
          setLoading(false);
        });
    } else {
      setLoading(false);
      Swal.fire({
        title: "Atención!",
        text: "Debes cargar una fecha para generar el informe",
        icon: "warning",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <div className="container-fluid">
      <div style={{ display: "none" }}>
        {(document.title = "Reporte de ventas en el local")}
      </div>
      <Breadcrumb
        parentName="Reportes de ventas"
        icon={faClipboard}
        parentLink="salesReport"
        currentName="Reporte de ventas en el local"
      />
      <div className="viewTitle">
        <h1>Reporte de ventas en el local</h1>
      </div>
      <div className="viewBody">
        <div className="d-flex flex-row justify-content-end">
          <label className="col-sm-10">
            Seleccione la fecha sobre la que desea generar el informe.
          </label>
          <div className="search-input col-sm-2">
            <div className="input-group">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  Fecha
                </span>
              </div>
              <input
                id="dateFrom"
                className="form-control"
                type="date"
                defaultValue={new Date().toISOString().slice(0, 10)}
                min="2021-01-01"
                ref={informDate}
              ></input>
            </div>
          </div>
        </div>
        <div className="formRow">
          <div className="form-control-label">
            <label>Descripción adicional del reporte</label>
          </div>
          <div className="form-control-input">
            <input
              className="form-control"
              type="text"
              id="descriptionReport"
              maxLength="120"
              ref={informDescription}
            />
          </div>
        </div>
        <div className="formRow d-flex justify-content-between">
          <div className="mx-auto">
            <button
              className="btn btn-light newBtn"
              id="genrateButon"
              onClick={generateInform}
              style={{ marginRight: "1em", minWidth: "15em" }}
            >
              <FaAngleRight /> Generar informe
            </button>
            <button
              className={
                MyDoc === ""
                  ? "btn btn-light disabledNewBtn"
                  : "btn btn-light newBtn"
              }
              style={{ marginRight: "1em", minWidth: "15em" }}
              id="printButon"
              disabled={MyDoc === ""}
              onClick={() => setShowPDF(true)}
            >
              <FaFile /> Imprimir informe
            </button>
          </div>
        </div>
      </div>
      {MyDoc ? (
        <Viewer
          MyDoc={MyDoc}
          reportOf="venta en el local"
          showPdf={showPdf}
          cancel={() => setShowPDF(false)}
          title={"(" + dateText(informDate.current.value, true, true) + ")"}
          description={informDescription.current.value}
        ></Viewer>
      ) : (
        <></>
      )}
      {loading ? (
        <LoaderSpinner color="secondary" loading="Cargando..."></LoaderSpinner>
      ) : null}
      {!loading && dataSales ? (
        dataSales.length === 0 ? (
          <h5 className="text-center" style={{ color: "gray" }}>
            No hay ventas realizadas en la fecha elegida
          </h5>
        ) : (
          <div className="d-flex flex-row">
            <div className="col-md-6">
              <table className="table table-control table-hover">
                <thead>
                  <tr>
                    <th scope="col" style={{ backgroundColor: "#A5DEF9" }}>
                      Tipo de pago
                    </th>
                    <th
                      scope="col"
                      style={{ backgroundColor: "#A5DEF9", textAlign: "right" }}
                    >
                      Cantidad de ventas
                    </th>
                    <th
                      scope="col"
                      style={{ backgroundColor: "#A5DEF9", textAlign: "right" }}
                    >
                      Monto total en pesos
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(dataSales).map((dataSalePerPayType) => {
                    let totalPerPayType = 0;
                    dataSalePerPayType.forEach(
                      (sale) =>
                        (totalPerPayType = totalPerPayType + sale.total_amount)
                    );
                    return (
                      <tr key={dataSalePerPayType[0].name}>
                        <td style={{ verticalAlign: "middle" }}>
                          {dataSalePerPayType[0].name}
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                            verticalAlign: "middle",
                          }}
                        >
                          {dataSalePerPayType.length} u
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                            verticalAlign: "middle",
                          }}
                        >
                          ${totalPerPayType}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="col-md-6">
              <h4 style={{fontWeight:'bold'}} className="text-center">Ventas en el local</h4>
              <Bar data={dataChart} options={options} />
            </div>
          </div>
        )
      ) : null}
    </div>
  );
};

export default OnsiteSalesInform;
