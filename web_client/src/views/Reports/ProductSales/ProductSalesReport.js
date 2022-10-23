import {
  updateReportDateTo,
  updateReportDateFrom,
  updateProductSales,
  updateTopTenProductSales,
  updateTypeProductSales,
} from "../../../actions/ReportsActions";
import { connect } from "react-redux";
import TopTenProductsSales from "./components/TopTenProductsSales";
import Options from "./components/Options";
import TypeProductsSales from "./components/TypeProductsSales";
import ListProductSales from "./components/ListProductSales";
import BeShowed from "../../../common/BeShowed";
import React, { useEffect, useState } from "react";
import dateText from "utils/DateFormat/dateText";
import Breadcrumb from "../../../common/Breadcrumb";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import LoaderSpinner from "common/LoaderSpinner";

const ProductSalesReport = (props) => {
  const [loaded, setLoaded] = useState(false);
  const [load, setLoad] = useState(false);
  const [from, setFrom] = useState(props.dateFrom);
  const [to, setTo] = useState(props.dateTo);
  let permissionsAccess = props.permissionsAccess;

  useEffect(() => {
    setFrom(props.dateFrom);
    setTo(props.dateTo);
  }, [props.productSales, props.dateFrom, props.dateTo]);

  return (
    <>
      <div style={{ display: "none" }}>
        {(document.title = "Reporte de productos vendidos a minoristas")}
      </div>
      <Breadcrumb
        parentName="Reportes de ventas minoristas"
        icon={faClipboard}
        parentLink="salesReport"
        currentName="Reporte de productos vendidos a minoristas"
      />
      <div className="viewTitle">
        <h1>Reporte de productos vendidos a minoristas</h1>
      </div>
      <div className="viewBody">
        <div className="row">
          <Options
            loaded={loaded}
            setLoaded={setLoaded}
            load={load}
            setLoad={setLoad}
            user={props.user}
            permissionsAccess={permissionsAccess}
          />
        </div>
        <br />
        <BeShowed show={loaded === false && load}>
          <LoaderSpinner
            color="secondary"
            loading="Cargando..."
          ></LoaderSpinner>
        </BeShowed>
        <BeShowed show={loaded === true && load}>
          <BeShowed show={props.productSales.length > 0}>
            <div className="text-center">
              <h4
                style={{
                  textAlign: "center",
                  verticalAlign: "middle",
                  fontWeight: "bold",
                }}
              >
                Productos vendidos desde{" "}
                {from
                  ? dateText(from, true, true)
                  : new Date().toLocaleDateString()}{" "}
                hasta{" "}
                {to
                  ? dateText(to, true, true)
                  : new Date().toLocaleDateString()}
              </h4>
            </div>
            <hr />
            <div className="formRow">
              <div className="col-sm-8" style={{ paddingRight: "2em" }}>
                <ListProductSales />
              </div>
              <div className="col-sm-4" style={{ paddingLeft: "2em" }}>
                <TopTenProductsSales />
                <TypeProductsSales />
              </div>
            </div>
          </BeShowed>
          <BeShowed show={props.productSales.length < 1 && load}>
            <br />
            <div className="text-center">
              <h4>
                No se encontraron salarios para el período (
                {from
                  ? dateText(from, true, true)
                  : new Date().toLocaleDateString()}{" "}
                hasta{" "}
                {to
                  ? dateText(to, true, true)
                  : new Date().toLocaleDateString()}
                )
              </h4>
            </div>
          </BeShowed>
        </BeShowed>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    dateTo: state.dateTo,
    dateFrom: state.dateFrom,
    productSales: state.productSales,
    topTenProductSales: state.topTenProductSales,
    typeProductSales: state.typeProductSales,
  };
};

const mapDispatchToProps = {
  updateReportDateTo,
  updateReportDateFrom,
  updateProductSales,
  updateTopTenProductSales,
  updateTypeProductSales,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductSalesReport);
