import React, { useEffect, useState, useRef} from "react";
import Axios from "axios";
import { connect } from 'react-redux';
import { updateProducts, updateProductsFiltered, updateDetailProducts, updateProductSelected, updateDetailsProductsModify, updateRefresh, updateDetailsProductsDelete } from '../../../actions/SalesActions';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import Buttons from "../../../common/Buttons";
import warningMessage from "../../../utils/warningMessage";

const ModalProduct = (props) => {

    const inputQuantity = useRef(0);
    const [quantity, setQuantity] = useState();
    const [subtotal, setSubtotal] = useState(null);
    const [ready, setReady] = useState(false);
    const [refreshModal, setRefreshModal] = useState(false);

    const cancel = () => { 
        props.setShowModal(false);
        setSubtotal(null);
        setQuantity(0);
        setRefreshModal(!refreshModal);
    }

    const onChangeQuantity = () => {
        const sub = parseFloat(Math.round((props.productSelected.price * inputQuantity.current.value) * 100) / 100).toFixed(2);
        setSubtotal(sub);
        setQuantity(inputQuantity.current.value);
    }

    useEffect(() => {
        if (quantity > 0){
            setReady(true);
        }
        else
        {
            setReady(false);
        }   
    },[quantity])

    useEffect(() => {
        if (props.actionModal == "M") {
            setQuantity(props.productSelected.quantity);
            setSubtotal(props.productSelected.subtotal);
        }
        else {
            setSubtotal(null);
            setQuantity(0);
        }
    },[props.productSelected, refreshModal])

    const registerProduct = () => {
        if (ready) {
            if (props.actionModal == "N") 
            {
                let aux = [props.productSelected];

                aux?.map((element, i) => {
                    element.quantity = quantity;
                    element.subtotal = subtotal;
                });
                props.updateProductSelected(aux);
                props.updateDetailProducts(props.productSelected);
            }
            else if (props.actionModal == "M") 
            {
                props.productSelected.quantity = quantity;
                props.productSelected.subtotal = subtotal;

                props.updateDetailsProductsModify(props.productSelected);                             
            }     
            else if (props.actionModal == "A")
            {
                props.productSelected.quantity = parseFloat(props.productSelected.quantity) + parseFloat(quantity);
                props.productSelected.subtotal = (parseFloat(props.productSelected.subtotal) + parseFloat(subtotal)).toFixed(2);

                props.updateDetailsProductsModify(props.productSelected); 
            }
            props.updateRefresh(!props.refresh);      
            props.setShowModal(false);  
            setRefreshModal(!refreshModal); 
        } else { 
            warningMessage("Error!!","Debe ingresar un cantidad mayor a 0","error");
        }
    }

    const onClickYES = () => {
        props.updateDetailsProductsDelete(props.productSelected);
        props.updateRefresh(!props.refresh);  
        props.setShowModal(false);  
    }

    const onClickNO = () => {
        props.setShowModal(false);  
    }

    return (
        <>
            {(props.actionModal != "D") && 
            <Modal isOpen={props.show} className="modal-sale modal-lg" >
                <ModalHeader>
                    <label>{props.productSelected.name}</label>
                </ModalHeader>
                <ModalBody>
                    <div className='formRow'>
                        <label>Descripción: </label>
                        <label>{props.productSelected.description}</label>
                    </div>
                    <div className='formRow'>
                        <label>Precio: </label>
                        <label>{props.productSelected.price}</label>
                    </div>
                    <div className='formRow'>
                        <div className='col-6'>
                            <label>Sector: </label>
                            <label>{props.productSelected.name_sector}</label>
                        </div>
                        <div className='col-6'>
                            <label>Tipo producto: </label>
                            <label>{props.productSelected.name_product_type}</label>
                        </div>
                    </div>
                    <div className='formRow'>
                        <div className='col-6'>
                            <label>Cantidad: </label>
                            <input type='number' min="1" id="id_quantity" ref={inputQuantity} placeholder="0" value={quantity} onChange={onChangeQuantity}></input>
                        </div>
                        <div className='col-6'>
                            <label>Subtotal:  $ </label>
                            <label>{subtotal}</label>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Buttons label="Confirmar" ready={ready} actionOK={registerProduct} actionNotOK={registerProduct} actionCancel={cancel}></Buttons>
                </ModalFooter>
            </Modal>
            }

            {(props.actionModal == "D") && 
            <Modal isOpen={props.show} className="modal-sale modal-lg" >
                <ModalHeader>
                    <label>CONFIRMACIÓN</label>
                </ModalHeader>
                <ModalBody>
                    <label>¿Esta seguro de que desea eliminar el producto {props.productSelected.name} ?</label>
                    <div className='formRow'>
                        <div className='col-6'>
                            <label>Cantidad: </label>
                            <label>{props.productSelected.quantity}</label>
                        </div>
                        <div className='col-6'>
                            <label>Subtotal:  $ </label>
                            <label>{props.productSelected.subtotal}</label>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button type="button" onClick={onClickYES}>SI</button>
                    <button type="button" onClick={onClickNO}>NO</button>
                </ModalFooter>
            </Modal>
            }
        </>
    )


}

const mapStateToProps = state => {
    return {
        products: state.products,
        productsFiltered: state.productsFiltered,
        detailProducts: state.detailProducts,
        productSelected: state.productSelected,
        refresh: state.refresh
    }
}

const mapDispatchToProps = {
    updateProducts,
    updateProductsFiltered,
    updateDetailProducts,
    updateProductSelected,
    updateDetailsProductsModify,
    updateRefresh,
    updateDetailsProductsDelete
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalProduct);