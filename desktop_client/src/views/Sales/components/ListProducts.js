import React, { useEffect, useState} from "react";
import Axios from "axios";
import { connect } from 'react-redux';
import { updateProducts, updateProductsFiltered, updateDetailProducts, updatePayType, updateTotalAmount, updateProductSelected } from '../../../actions/SalesActions';
import "../styles/listProduct.css";
import ModalProduct from "./ModalProduct";
import BeShowed from "../../../common/BeShowed";
import DivGeneric from "../../../common/DivGeneric";

const PORT = require('../../../config');

const ListProducts = (props) => {
    
    const [printModal, setPrintModal] = useState(false);
    
    // "N":new -- "M":modify -- "A":add -- "D":delete
    const [actionModal, setActionModal] = useState();

    const changePrintModal = (e) => {
        const id = e.target.value;
        if (props.detailProducts.some(n => n.id_product == id))
        {
            props.updateProductSelected(props.detailProducts.find(n => n.id_product == id))
            setActionModal("A");
        }
        else
        {
            props.updateProductSelected(props.productsFiltered.find(n => n.id_product == id));
            setActionModal("N");
        }
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