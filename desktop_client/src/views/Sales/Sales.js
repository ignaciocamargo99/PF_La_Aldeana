import React, {useEffect} from "react";
import DetailSale from './components/DetailSale';
import ListProducts from './components/ListProducts';
import FilterProducts from './components/FilterProducts';
import PaymentSale from "./components/PaymentSale";
import { updateProducts, updateProductsFiltered } from '../../actions/SalesActions';
import Axios from "axios";
import { connect } from 'react-redux';

const PORT = require('../../config');

const Sales = (props) => {
    
    useEffect(() => {
        Axios.get(`${PORT()}/api/allProducts`) 
            .then(response => {
                props.updateProducts(response.data);
                props.updateProductsFiltered(response.data);
            })
            .catch(error => console.error(error))
    },[])

    return(
        <>
            <div className="viewContent">
                <h1 className="display-5">Ventas</h1>  
                <hr/>
                <div className="row">
                    <div className="col-8">
                        <h3>Seleccione los productos...</h3>
                        <FilterProducts></FilterProducts>
                        <ListProducts></ListProducts>
                    </div>

                    <div className="col-4">
                        <h3>Detalle de la venta</h3>
                        
                        <DetailSale></DetailSale>
                        <PaymentSale></PaymentSale>
                    </div>
                </div> 
            </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
        products: state.products,
        productsFiltered: state.productsFiltered
    }
}

const mapDispatchToProps = {
    updateProducts,
    updateProductsFiltered
}

export default connect(mapStateToProps, mapDispatchToProps)(Sales);