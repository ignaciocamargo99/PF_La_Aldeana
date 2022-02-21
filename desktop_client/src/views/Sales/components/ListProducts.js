import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { updateProducts, updateProductsFiltered, updateDetailProducts, updatePayType, updateTotalAmount, updateProductSelected } from '../../../actions/SalesActions';
import "../styles/listProduct.css";
import ModalProduct from "./ModalProduct";
import DivGeneric from "../../../common/DivGeneric";
import '../styles/filterProducts.css';

const PORT = require('../../../config');

const ListProducts = (props) => {

    const [printModal, setPrintModal] = useState(false);

    // "N":new -- "M":modify -- "A":add -- "D":delete
    const [actionModal, setActionModal] = useState();

    const changePrintModal = (id) => {
        if (props.detailProducts.some(n => n.id_product == id)) {
            props.updateProductSelected(props.detailProducts.find(n => n.id_product == id))
            setActionModal("A");
        }
        else {
            props.updateProductSelected(props.productsFiltered.find(n => n.id_product == id));
            setActionModal("N");
        }
        setPrintModal(true);
    }

    return (
        <>
            <h2><b>Productos</b></h2>
            <DivGeneric children={props.productsFiltered?.map((product, i) => {
                return (
                    <div key={i}>
                        <button style={product.disabled ? {backgroundColor: "grey"} : {backgroundColor: "#F68634"}} className="btn_products" id={`btn_${product.id_product}`} disabled={product.disabled} type='button' value={product.id_product} onClick={(e) => changePrintModal(product.id_product)}>{product.name}</button>
                    </div>
                )
            })}></DivGeneric>
            <ModalProduct show={printModal} setShowModal={setPrintModal} actionModal={actionModal}></ModalProduct>
        </>
    )
}

const mapStateToProps = state => {
    return {
        products: state.products,
        productsFiltered: state.productsFiltered,
        detailProducts: state.detailProducts,
        productSelected: state.productSelected,
        payType: state.payType,
        totalAmount: state.totalAmount
    }
}

const mapDispatchToProps = {
    updateProducts,
    updateProductsFiltered,
    updateDetailProducts,
    updateProductSelected
}

export default connect(mapStateToProps, mapDispatchToProps)(ListProducts);