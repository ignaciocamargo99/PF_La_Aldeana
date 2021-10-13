import { updateReportDateTo, updateReportDateFrom, updateProductSales, updateTopTenProductSales, updateTypeProductSales } from '../../../actions/ReportsActions';
import { connect } from 'react-redux';
import TopTenProductsSales from "./components/TopTenProductsSales";
import Options from "./components/Options";
import TypeProductsSales from "./components/TypeProductsSales";
import ListProductSales from "./components/ListProductSales";
import BeShowed from "../../../common/BeShowed";
import React, { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';

const SalesReport = (props) => {

    const [loaded, setLoaded] = useState(false);
    const [load, setLoad] = useState(0);

    const [from, setFrom] = useState(props.dateFrom);
    const [to, setTo] = useState(props.dateTo)

    useEffect(() => {
        setFrom(props.dateFrom);
        setTo(props.dateTo);
    }, [props.productSales, props.dateFrom, props.dateTo]);

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Reportes y estadísticas"}</div>
            <div className="viewTitle">
                <h1>Reporte de ventas de productos</h1>
            </div>
            <div className="viewBody">
                <div className="row">
                    <Options loaded={loaded} setLoaded={setLoaded} load={load} setLoad={setLoad} />
                </div>
                <br />
                <BeShowed show={loaded === false && load > 0}>
                    <div className="text-center">
                        <Spinner size="sm" color="secondary" />
                    </div>
                </BeShowed>
                <BeShowed show={loaded === true && load > 0}>
                    <BeShowed show={props.productSales.length > 0}>
                        <div className="text-center">
                            <h5 style={{ textAlign: 'center', verticalAlign: 'middle' }}>Productos vendidos desde {from} hasta {to}</h5>
                        </div>
                        <hr />
                        <div className="formRow">
                            <div className="col-sm-8" style={{ paddingRight: '2em' }}>
                                <ListProductSales />
                            </div>
                            <div className="col-sm-4" style={{ paddingLeft: '2em' }}>
                                <TopTenProductsSales />
                                <TypeProductsSales />
                            </div>
                        </div>
                    </BeShowed>
                    <BeShowed show={props.productSales.length < 1}>
                        <br />
                        <div className="text-center">
                            <h2>No se encontraron ventas para el período ({from} - {to})</h2>
                        </div>
                    </BeShowed>
                </BeShowed>
            </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
        dateTo: state.dateTo,
        dateFrom: state.dateFrom,
        productSales: state.productSales,
        topTenProductSales: state.topTenProductSales,
        typeProductSales: state.typeProductSales
    }
}

const mapDispatchToProps = {
    updateReportDateTo,
    updateReportDateFrom,
    updateProductSales,
    updateTopTenProductSales,
    updateTypeProductSales
}

export default connect(mapStateToProps, mapDispatchToProps)(SalesReport);