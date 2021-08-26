import React, { useEffect, useState} from "react";
import Axios from "axios";
import { connect } from 'react-redux';
import { updateProducts, updateProductsFiltered, updateProductSelected } from '../../../actions/SalesActions';
import "../styles/listProduct.css";
import ModalProduct from "./ModalProduct";
import BeShowed from "../../../common/BeShowed";
import DivGeneric from "../../../common/DivGeneric";

const PORT = require('../../../config');

const ListProducts = (props) => {
    
    const [printModal, setPrintModal] = useState(false);

    const changePrintModal = (e) => {
        const id = e.target.value;
        props.updateProductSelected(props.productsFiltered.find(n => n.id_product == id));
        setPrintModal(true);
    }

    return(
        <> 
            <h1>Productos</h1>
            <DivGeneric children={props.productsFiltered?.map((product, i) => {
                return (
                <div key={i}>
                    <button style={{width: 150, height: 150}} type='button' value={product.id_product} onClick={(e) => changePrintModal(e)}>{product.name}</button>
                </div>
            )})}></DivGeneric>
            <ModalProduct show={printModal} setShowModal={setPrintModal}></ModalProduct>
        </>
    )
}

const mapStateToProps = state => {
    return {
        products: state.products,
        productsFiltered: state.productsFiltered,
        productSelected: state.productSelected
    }
}

const mapDispatchToProps = {
    updateProducts,
    updateProductsFiltered,
    updateProductSelected
}

export default connect(mapStateToProps, mapDispatchToProps)(ListProducts);