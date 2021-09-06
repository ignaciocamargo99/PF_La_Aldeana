import { updateReportDateTo, updateReportDateFrom, updateProductSales } from '../../../actions/ReportsActions';
import { connect } from 'react-redux';
import useHTTPGet from '../../../hooks/useHTTPGet';
import TopTenProductsSales from "./components/TopTenProductsSales";
import Options from "./components/Options";
import TypeProductsSales from "./components/TypeProductsSales";
import ListProductSales from "./components/ListProductSales";

const PORT = require('../../../config');

const SalesReport = (props) => {

    const sales = useHTTPGet(PORT() + '/api/salesReport');

    return (
        <>
            <div className="viewTitle">
                <h1>Reporte de ventas de productos</h1>
            </div>
            <div className="viewBody">
                <div className="row">
                    <Options />
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <ListProductSales />
                    </div>
                    <div className="col-sm-6">
                        <TopTenProductsSales />
                        <TypeProductsSales />
                    </div>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
        dateTo: state.dateTo,
        dateFrom: state.dateFrom,
        productSales: state.productSales
    }
}

const mapDispatchToProps = {
    updateReportDateTo,
    updateReportDateFrom,
    updateProductSales
}

export default connect(mapStateToProps, mapDispatchToProps)(SalesReport);