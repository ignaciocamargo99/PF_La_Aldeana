import React, { useState } from 'react';
import BeShowed from '../../../common/BeShowed';
import RadioButtons from './RadioButtons';
import Buttons from '../../../common/Buttons';
import ListProducts from './ListProducts';
import ModalFlavorSelect from './ModalFlavorSelect';
import ModalFlavorShow from './ModalFlavorShow';
import {connect} from 'react-redux';
import { updateDeliveryProductQuantity,updateDeliveryProductsQuantities, updateAllFlavorsProduct, addDetailDelivery, sumTotalDelivery, deleteDetailDelivery, subtractTotalDelivery} from '../../../actions/DeliverySalesActions';
import errorInputQuantities from '../../../utils/ErrorMessages/errorInputQuantities';
import SaleDetails from './SaleDetails';
import errorNextStepOne from '../../../utils/ErrorMessages/errorNextStepOne';
import LoaderSpinner from '../../../common/LoaderSpinner';

const Products = (props) => {

    const [filter,setFilter] = useState(0);
    const [nameShow,setNameShow] = useState('');
    const [showModal,setShowModal] = useState(false);
    const [showModalView,setShowModalView] = useState(false);
    const [quantityFlavor,setQuantityFlavor] = useState();


    const upload = (id,i) => {
        let productQuantityToAdd = props.productsQuantities.find(productQuantity => productQuantity.product.id_product === id);
        let prevDetail = props.detailsDelivery.find(detail => detail.product.id_product === id);
        if(productQuantityToAdd.quantity > 0){
            if(productQuantityToAdd.product.quantity_flavor > 0){
                let aux = [];
                for(let i = 0 ; i < productQuantityToAdd.quantity ; i++){
                    aux.push([]);
                }
                props.updateAllFlavorsProduct(aux);
                setQuantityFlavor(productQuantityToAdd.product.quantity_flavor);
                setShowModal(true);
            }
            if(prevDetail === undefined){
                let subtotal = productQuantityToAdd.quantity * productQuantityToAdd.product.price;
                let detail = { 
                    'detail_number': props.detailsDelivery.length,
                    'product': productQuantityToAdd.product,
                    'flavors': null,
                    'quantity': productQuantityToAdd.quantity,
                    'subtotal': subtotal
                };
                props.addDetailDelivery(detail);
                props.sumTotalDelivery(subtotal);
            }
            else{
                let subtotal = productQuantityToAdd.quantity * productQuantityToAdd.product.price;
                prevDetail.quantity = prevDetail.quantity + productQuantityToAdd.quantity;
                prevDetail.subtotal = prevDetail.subtotal + subtotal;
                props.sumTotalDelivery(subtotal);
            }
            props.updateDeliveryProductQuantity({'product':props.productsQuantities[i].product,'quantity':0},i);
        }else{
            errorInputQuantities();
        }
    }

    const download = (i) => {
        let restar = props.detailsDelivery[i].subtotal;
        props.subtractTotalDelivery(restar);
        props.deleteDetailDelivery(i);
    }

    return(
    <>
        <div className="formRow">
            <h3><b>Productos</b></h3>
        </div>
        <RadioButtons products={props.productsQuantities} setFilter={setFilter}/>
        <hr />
        <ModalFlavorSelect show={showModal} setShowModal={setShowModal} quantityFlavor={quantityFlavor}/>
        <ModalFlavorShow show={showModalView} setShowModalShow={setShowModalView} productName={nameShow} flavorsToView={props.flavorsProduct}/>
        <div className="formRow">
            <div className="col-md-6">
                <BeShowed show={props.productsQuantities.length === 0 }>    
                    <LoaderSpinner color='primary' description="Cargando productos..."/>
                </BeShowed>
                <BeShowed show={props.productsQuantities.length !== 0 }>
                    <ListProducts onClick={upload} filter={filter}/>
                </BeShowed>
            </div>
            <div className="col-md-6" style={{marginLeft:'2%'}}>
                <div className="formRow">
                    <h3><b>Detalle de venta</b></h3>
                </div>
                <SaleDetails buttons={true} onClick={download} setNameShow={setNameShow} setShowModalView={setShowModalView}/>
                <div className="formRow">
                    <div className="col-sm-3 offset-sm-9">
                        <label>Total: ${props.total}</label>
                    </div>
                </div>
                <Buttons label='Siguiente' ready={props.detailsDelivery.length>0?true:false} actionCancel={() => {props.resetStates(true)}} actionNotOK={() => {errorNextStepOne()}} actionOK={() => {props.setStep(2)}} />
            </div>
        </div>
    </>)
}

const mapStateToProps = state => {
    return {
        detailsDelivery: state.detailsDelivery,
        total: state.totalDelivery,
        flavorsProduct: state.flavorsProductDelivery,
        productsQuantities: state.productsQuantitiesDelivery,
        quantities: state.quantitiesDelivery
    }
}

const mapDispatchToProps = {
    addDetailDelivery,
    updateAllFlavorsProduct,
    sumTotalDelivery,
    deleteDetailDelivery,
    subtractTotalDelivery,
    updateDeliveryProductsQuantities,
    updateDeliveryProductQuantity
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);