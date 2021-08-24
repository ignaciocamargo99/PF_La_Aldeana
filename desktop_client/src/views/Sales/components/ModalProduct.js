import React, { useEffect, useState} from "react";
import Axios from "axios";
import { connect } from 'react-redux';
import { updateProducts, updateProductsFiltered, updateDetailProducts, updateProductSelected } from '../../../actions/SalesActions';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';

const ModalProduct = (props) => {

    return (
        <>
            <Modal isOpen={props.show} className="modal-sale modal-lg" >
                <ModalHeader>
                    <label>{props.productSelected.name}</label>
                </ModalHeader>
                <ModalBody>
                    <label>Body</label>
                </ModalBody>
                <ModalFooter>
                    <label>Footer</label>   
                </ModalFooter>
            </Modal>
        </>
    )


}

const mapStateToProps = state => {
    return {
        products: state.products,
        productsFiltered: state.productsFiltered,
        detailProducts: state.detailProducts,
        productSelected: state.productSelected
    }
}

const mapDispatchToProps = {
    updateProducts,
    updateProductsFiltered,
    updateDetailProducts,
    updateProductSelected
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalProduct);