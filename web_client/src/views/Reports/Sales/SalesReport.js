import { updateReportDateTo, updateReportDateFrom, updateProductSales, updateTopTenProductSales, updateTypeProductSales } from '../../../actions/ReportsActions';
import { connect } from 'react-redux';
import TopTenProductsSales from "./components/TopTenProductsSales";
import Options from "./components/Options";
import TypeProductsSales from "./components/TypeProductsSales";
import ListProductSales from "./components/ListProductSales";
import BeShowed from "../../../common/BeShowed";
import React, { useEffect , useRef, useState} from 'react';

const SalesReport = (props) => {

    useEffect(()=>{
        console.log(props.productSales)
        console.log(props.typeProductSales.total)
        console.log(props.topTenProductSales)
    },[props.productSales])

    return (
        <>
            <div className="viewTitle">
                <h1>Reporte de ventas de productos</h1>
            </div>
            <div className="viewBody">
                <div className="row">
                    <Options />
                </div>

                <BeShowed show={props.productSales.length > 0}>
                    <div className="row">
                        <div className="col-sm-8">
                            <ListProductSales />
                        </div>
                        <div className="col-sm-4">
                            <TopTenProductsSales />
                            <TypeProductsSales />
                        </div>
                    </div>
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