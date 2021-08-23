import React, { useEffect, useState} from "react";
import Axios from "axios";
import { connect } from 'react-redux';
import { updateProducts, updateProductsFiltered, updateDetailProducts } from '../../../actions/SalesActions';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';

const ModalProduct = (props) => {

    return (
        <>
            <Modal isOpen={props.show} className="modal-sale modal-lg" >
                <ModalHeader>
                    <label>Header</label>
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
        detailProducts: state.detailProducts
    }
}

const mapDispatchToProps = {
    updateProducts,
    updateProductsFiltered,
    updateDetailProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalProduct);