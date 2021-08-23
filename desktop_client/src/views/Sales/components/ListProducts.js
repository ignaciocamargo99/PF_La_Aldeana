import React, { useEffect, useState} from "react";
import Axios from "axios";
import { connect } from 'react-redux';
import { updateProducts, updateProductsFiltered } from '../../../actions/SalesActions';
import "../styles/listProduct.css";
import ModalProduct from "./ModalProduct";
import BeShowed from "../../../common/BeShowed";
import DivGeneric from "../../../common/DivGeneric";

const PORT = require('../../../config');

const ListProducts = (props) => {
    
    const [printModal, setPrintModal] = useState(false);

    //sacar!!!
    const Pagination = (array, pageSize, currentPage) => {
        var totalItems = array.length;
        var totalPages = Math.ceil(totalItems / pageSize);
    }

    const changePrintModal = (id_product) => {
        setPrintModal(true);   
    }

    return(
        <> 
            <h1>Productos</h1>
            <DivGeneric children={props.productsFiltered?.map((product, i) => {
                return (
                <div key={i}>
                    <button style={{width: 150, height: 150}} type='button' onClick={changePrintModal}>{product.name}</button>
                </div>
            )})}></DivGeneric>
            <ModalProduct show={printModal}></ModalProduct>
        </>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(ListProducts);