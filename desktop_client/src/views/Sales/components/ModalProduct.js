import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import {
    updateDetailProducts,
    updateDetailsProductsModify,
    updateProducts,
    updateProductSelected,
    updateProductsFiltered,
    updateRefresh
} from '../../../actions/SalesActions';
import Buttons from '../../../common/Buttons';
import warningMessage from '../../../utils/warningMessage';
import '../styles/filterProducts.css';
import '../styles/modalProduct.css';
import { calculateStock } from './calculateStock';
import { NumericKeyboard } from './NumericKeyboard';

const styles = {
    labelQuantity: {
        color: '#383C77'
    }
};

const ModalProduct = (props) => {
    const inputQuantity = useRef();
    const [quantity, setQuantity] = useState();
    const [subtotal, setSubtotal] = useState(null);
    const [ready, setReady] = useState(false);
    const [refreshModal, setRefreshModal] = useState(false);
    const [keyboardNumber, setKeyboardNumber] = useState();
    const [descriptionProduct, setDescriptionProduct] = useState();

    const handleObs = (e) => setDescriptionProduct(e.target.value);

    const cancel = () => {
        props.setShowModal(false);
        setSubtotal(null);
        setQuantity(0);
        setRefreshModal(!refreshModal);
    };

    useEffect(() => setKeyboardNumber(0), []);

    const loadQuantityChange = (e) => {
        let numberKeyboard = parseInt(e);
        setKeyboardNumber(numberKeyboard);
        const sub = parseFloat(
            Math.round(props.productSelected.price * numberKeyboard * 100) / 100
        ).toFixed(2);
        setSubtotal(sub);
        setQuantity(numberKeyboard);
    };

    useEffect(() => {
        if (props.actionModal == 'N') {
            if (
                (quantity > 0 &&
                    quantity <= props.productSelected.stock_current) ||
                !props.productSelected.stock_current
            ) {
                setReady(true);
            } else {
                setReady(false);
            }
        } else if (props.actionModal == 'M') {
            if (quantity > 0 && quantity <= props.productSelected.stock) {
                if (inputQuantity.current)
                    inputQuantity.current.value = quantity;
                setReady(true);
            } else {
                setReady(false);
            }
        } else if (props.actionModal == 'A') {
            if (
                (quantity > 0 &&
                    quantity <= props.productSelected.stock_current) ||
                !props.productSelected.stock_current
            ) {
                setReady(true);
            } else {
                setReady(false);
            }
        }
        if (quantity === 0) setReady(false);
    }, [quantity, props.productSelected]);

    useEffect(() => {
        if (props.show) {
            if (props.actionModal == 'M') {
                setQuantity(props.productSelected.quantity);
                setSubtotal(props.productSelected.subtotal);
            } else {
                setSubtotal(null);
                setQuantity(0);
            }
        }
    }, [props.productSelected, props.show]);

    const registerProduct = () => {
        if (ready) {
            if (props.actionModal == 'N') {
                let aux = props.productSelected;
                aux.quantity = quantity;
                aux.subtotal = subtotal;
                aux.descriptionProduct = descriptionProduct;
                if (aux.stock) {
                    aux.stock_current = aux.stock - parseFloat(quantity);
                }
                props.updateProductSelected(aux);
                props.updateDetailProducts(aux);
            } else if (props.actionModal == 'M') {
                props.productSelected.quantity = quantity;
                props.productSelected.subtotal = subtotal;
                props.productSelected.descriptionProduct = descriptionProduct;
                if (props.productSelected.stock) {
                    console.log(props.productSelected);
                    props.productSelected.stock_current =
                        props.productSelected.stock - parseFloat(quantity);
                }
                props.updateDetailsProductsModify(props.productSelected);
            } else if (props.actionModal == 'A') {
                props.productSelected.quantity =
                    parseFloat(props.productSelected.quantity) +
                    parseFloat(quantity);
                props.productSelected.subtotal = (
                    parseFloat(props.productSelected.subtotal) +
                    parseFloat(subtotal)
                ).toFixed(2);
                props.productSelected.descriptionProduct = descriptionProduct;
                if (props.productSelected.stock) {
                    props.productSelected.stock_current =
                        props.productSelected.stock_current -
                        parseFloat(quantity);
                }
                props.updateDetailsProductsModify(props.productSelected);
            }
            props.updateRefresh(!props.refresh);
            props.setShowModal(false);
            setRefreshModal(!refreshModal);
            setDescriptionProduct('');
        } else {
            if (quantity == 0) {
                warningMessage(
                    '¡Atención!',
                    'Debe ingresar un cantidad mayor a 0',
                    'warning'
                );
            }
            if (
                quantity > props.productSelected.stock ||
                quantity > props.productSelected.stock_current
            )
                warningMessage(
                    '¡Error!',
                    'No hay stock suficiente \n Stock aún disponible: ' +
                        props.productSelected.stock_current +
                        '\n Stock máximo que puede ingresar en el detalle: ' +
                        props.productSelected.stock,
                    'error'
                );
        }
        calculateStock(
            props.products,
            props.supplies,
            props.productsXsupplies,
            props.productSelected,
            quantity
        );
    };

    return (
        <>
            <Modal isOpen={props.show} className='modal-sale modal-lg'>
                <ModalHeader>
                    <h2>{props.productSelected?.name}</h2>
                </ModalHeader>
                <ModalBody>
                    <div className='formRow' style={{ marginBottom: '10px' }}>
                        <label className='label-modal'>
                            Descripción:&nbsp;
                        </label>
                        <label>{props.productSelected?.description}</label>
                    </div>
                    <div className='formRow' style={{ marginBottom: '10px' }}>
                        <div className='col-6'>
                            <label className='label-modal'>Sector:&nbsp;</label>
                            <label>{props.productSelected?.name_sector}</label>
                        </div>
                        <div className='col-6' style={{ marginBottom: '10px' }}>
                            <label className='label-modal'>
                                Tipo producto:&nbsp;
                            </label>
                            <label>
                                {props.productSelected?.name_product_type}
                            </label>
                        </div>
                    </div>
                    <div className='row' style={{ marginBottom: '10px' }}>
                        <div className='col-6'>
                            <div className='formRow'>
                                <label className='label-modal'>
                                    Cantidad:&nbsp;
                                </label>
                                <label
                                    className='label-modal'
                                    style={styles.labelQuantity}
                                    id='id_quantity'
                                    ref={inputQuantity}
                                    // value={inputQuantity.current ? inputQuantity.current.value : quantity === 0 ? "" : quantity}
                                >
                                    {quantity}
                                </label>
                            </div>
                            <div className='formRow'>
                                <label className='label-modal'>
                                    Precio:&nbsp;$
                                </label>
                                <label className='label-modal'>
                                    {props.productSelected?.price}
                                </label>
                            </div>
                            <div className='formRow'>
                                <label className='label-modal'>
                                    Subtotal:&nbsp;${' '}
                                </label>
                                <label className='label-modal'>
                                    {subtotal}
                                </label>
                            </div>
                            <div className='formRow'>
                                <label className='label-modal'>
                                    Observación:{' '}
                                </label>
                            </div>
                            <div className='formRow'>
                                <textarea
                                    maxLength='200'
                                    id='productDescription'
                                    placeholder='Ingrese una observación...'
                                    style={{ width: '100%', height: '74px' }}
                                    onChange={(e) => handleObs(e)}
                                ></textarea>
                            </div>
                        </div>
                        <div
                            className='col-6'
                            style={{ padding: '0px 0px 0px 0px' }}
                        >
                            <NumericKeyboard
                                load={loadQuantityChange}
                                keyboardNumber={keyboardNumber}
                                quantity={quantity}
                            />
                        </div>
                    </div>
                    <Buttons
                        label='Confirmar'
                        ready={ready}
                        actionOK={registerProduct}
                        actionNotOK={registerProduct}
                        actionCancel={cancel}
                    ></Buttons>
                </ModalBody>
            </Modal>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        products: state.products,
        productsFiltered: state.productsFiltered,
        detailProducts: state.detailProducts,
        productSelected: state.productSelected,
        refresh: state.refresh,
        supplies: state.supplies,
        productsXsupplies: state.productsXsupplies
    };
};

const mapDispatchToProps = {
    updateProducts,
    updateProductsFiltered,
    updateDetailProducts,
    updateProductSelected,
    updateDetailsProductsModify,
    updateRefresh
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalProduct);
