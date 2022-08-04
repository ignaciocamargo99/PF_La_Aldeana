import React, { useRef, useState } from "react";
import Breadcrumb from "common/Breadcrumb";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { FaAngleRight } from "react-icons/fa";
import { FaFile } from "react-icons/fa";
import LoaderSpinner from "common/LoaderSpinner";
import Swal from "sweetalert2";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import dateText from "utils/DateFormat/dateText";
import MyDocument from "./PDFTotalSalesReport";
import Viewer from "../ProductSales/components/PDFModalViewer";

const PORT = require("../../../config");

const TotalSalesReport = ({ permissionsAccess, user }) => {
  const dateInit = useRef();
  const dateFinish = useRef();
  const informDescription = useRef();
  const [loading, setLoading] = useState(false);
  const [myDoc, setMyDoc] = useState(null);
  const [showPdf, setShowPdf] = useState(false);
  const [notSales, setNotSales] = useState(null);
  const [dataSales, setDataSales] = useState(null);
  const [dataChart, setDataChart] = useState(null);

  const generateInform = () => {
    setLoading(true);
    if (dateInit.current.value !== "" && dateFinish.current.value !== "") {
      axios
        .get(
          `${PORT()}/api/sales?dayInit=${dateInit.current.value}&dayFinish=${
            dateFinish.current.value
          }`
        )
        .then(({ data }) => {
          let chartLabel = [];
          let chartDataSet = [];
          let areSales = false;
          let total = 0;
          data.forEach(({ isOnsite, quantity_sales }) => {
            chartLabel.push(
              isOnsite === 1
                ? "Venta en el local"
                : isOnsite === 0
                ? "Venta por delivery"
                : "Venta a franquicia"
            );
            if (quantity_sales > 0) areSales = true;
            chartDataSet.push(quantity_sales);
            total = total + quantity_sales;
          });
          let newDataChart = {
            labels: chartLabel,
            datasets: [
              {
                label: "Ventas",
                data: chartDataSet,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                ],
                borderWidth: 1,
              },
            ],
          };
          const totalised = {
            type: "outlabeledPie",
            labels: chartLabel,
            datasets: [
              {
                label: "baldes",
                data: chartDataSet,
              },
            ],
            total: total,
          };
          setDataChart(newDataChart);
          setMyDoc(
            areSales ? (
              <MyDocument
                user={user}
                title={
                  "(" +
                  dateText(dateInit.current.value, true, true) +
                  " al " +
                  dateText(dateFinish.current.value, true, true) +
                  ")"
                }
                description={informDescription.current.value}
                chart={totalised}
                dataSales={data}
              />
            ) : null
          );
          setNotSales(!areSales);
          setDataSales(data);
          setLoading(false);
        });
    } else {
      setLoading(false);
      Swal.fire({
        title: "Atención!",
        text: "Debes cargar las fechas para generar el informe",
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
          <label className="col-sm-5">
            Seleccione el rango de fechas sobre el que desea generar el informe.
          </label>
          <div className="search-input col-sm-3">
            <div className="input-group">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  Fecha desde
                </span>
              </div>
              <input
                id="dateFrom"
                className="form-control"
                style={{ maxWidth: "9em" }}
                type="date"
                defaultValue={new Date().toISOString().slice(0, 10)}
                min="2021-01-01"
                ref={dateInit}
              ></input>
            </div>
          </div>
          <div className="search-input col-sm-3 offset-sm-1">
            <div className="input-group">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  Fecha hasta
                </span>
              </div>
              <input
                id="dateFrom"
                className="form-control"
                style={{ maxWidth: "9em" }}
                type="date"
                defaultValue={new Date().toISOString().slice(0, 10)}
                min="2021-01-01"
                ref={dateFinish}
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
              style={{ marginRight: "1em", minWidth: "15em" }}
              id="printButon"
              disabled={!myDoc}
              className={
                myDoc ? "btn btn-light newBtn" : "btn btn-light disabledNewBtn"
              }
              onClick={() => setShowPdf(true)}
            >
              <FaFile /> Imprimir informe
            </button>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        {myDoc ? (
          <Viewer
            MyDoc={myDoc}
            reportOf="ventas totales"
            showPdf={showPdf}
            cancel={() => setShowPdf(false)}
            title={
              "(" +
              dateText(dateInit.current.value, true, true) +
              " al " +
              dateText(dateFinish.current.value, true, true) +
              ")"
            }
            description={informDescription.current.value}
          ></Viewer>
        ) : (
          <></>
        )}
        {loading ? (
          <LoaderSpinner
            color="secondary"
            loading="Cargando..."
          ></LoaderSpinner>
        ) : null}
        {notSales && !loading ? (
          <h5 className="text-center mt-5" style={{ color: "gray" }}>
            No hay ventas realizadas en la fecha elegida
          </h5>
        ) : null}
        {dataSales && !notSales && !loading ? (
          <div className="d-flex flex-row">
            <div className="col-md-7">
              <table className="table table-control table-hover">
                <thead>
                  <tr>
                    <th scope="col" style={{ backgroundColor: "#A5DEF9" }}>
                      Tipo de venta
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
                  {dataSales.map((dataSale, i) => {
                    return (
                      <tr key={i}>
                        <td style={{ verticalAlign: "middle" }}>
                          {dataSale.isOnsite === 1
                            ? "Venta en el local"
                            : dataSale.isOnsite === 0
                            ? "Venta por delivery"
                            : "Venta a franquicia"}
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                            verticalAlign: "middle",
                          }}
                        >
                          {dataSale.quantity_sales} u
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                            verticalAlign: "middle",
                          }}
                        >
                          ${parseInt(dataSale.total)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="col-md-4 offset-md-1">
              <h5 className="text-center">Ventas</h5>
              <Pie data={dataChart} style={{ height: "85%" }} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TotalSalesReport;
