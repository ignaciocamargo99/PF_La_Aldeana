import React, { useEffect, useState } from 'react';
import BeShowed from '../../../common/BeShowed';
import RadioButtons from './RadioButtons';
import Buttons from '../../../common/Buttons';
import ListProducts from './ListProducts';
import ModalFlavorSelect from './ModalFlavorSelect';
import ModalFlavorShow from './ModalFlavorShow';
import { Spinner } from 'reactstrap';
import {connect} from 'react-redux';
import { updateDeliveryProducts, updateAllFlavorsProduct, addDetailDelivery, sumTotalDelivery, deleteDetailDelivery, subtractTotalDelivery} from '../../../actions/DeliverySalesActions';
import errorInputQuantities from '../../../utils/ErrorMessages/errorInputQuantities';
import SaleDetails from './SaleDetails';
import errorNextStepOne from '../../../utils/ErrorMessages/errorNextStepOne';

const Products = (props) => {

    const [filterProducts,setFilterProducts] = useState([]);
    const [nameShow,setNameShow] = useState('');
    const [showModal,setShowModal] = useState(false);
    const [showModalView,setShowModalView] = useState(false);


    const upload = (id,i) => {
        let inputQuantity = document.getElementById(`quantityInput${i}`)
        if(inputQuantity.value > 0){
            let productToAdd = props.products.find(product => product.id_product === id)
            if(productToAdd.id_sector === 1){
                let aux = []
                for(let i = 0 ; i < inputQuantity.value ; i++){
                    aux.push([])
                }
                props.updateAllFlavorsProduct(aux)
                setShowModal(true)
            }
            let subtotal = inputQuantity.value * productToAdd.price
            let detail = { 
                'sale_number': null,
                'detail_number': props.detailsDelivery.length,
                'product': productToAdd,
                'flavors': null,
                'quantity': inputQuantity.value,
                'subtotal': subtotal
            }
            props.addDetailDelivery(detail)
            props.sumTotalDelivery(subtotal)
            let newProducts = props.products.filter(product => product.id_product !== id)
            props.updateDeliveryProducts(newProducts)
        }else{
            errorInputQuantities()
        }
    }

    const download = (id,i) => {
        let productToQuit
        props.detailsDelivery.map((detail) => {
            if(detail.product.id_product === id){
                productToQuit = detail.product
            }
        })
        let newProducts = props.products
        newProducts.push(productToQuit)
        props.updateDeliveryProducts(newProducts)
        let restar = props.detailsDelivery[i].subtotal
        props.subtractTotalDelivery(restar)
        props.deleteDetailDelivery(i)
    }

    return(
    <>
        <div className="formRow">
            <h3><b>Productos</b></h3>
        </div>
        <RadioButtons products={props.products} setFilterProducts={setFilterProducts}/>
        <hr />
        <ModalFlavorSelect show={showModal} setShowModal={setShowModal} />
        <ModalFlavorShow show={showModalView} setShowModalShow={setShowModalView} productName={nameShow} flavorsToView={props.flavorsProduct}/>
        <BeShowed show={props.products.length === 0}>
            <div className="row justify-content-center align-items-center">
                <Spinner color="dark" />
                <label className="offset-sm-10">Cargando productos...</label>
            </div>
        </BeShowed>
        <BeShowed show={props.products.length !== 0}>
            <ListProducts products={filterProducts} onClick={upload}/>
        </BeShowed>
        <div className="formRow">
            <h3><b>Detalle de venta</b></h3>
        </div>
        <SaleDetails onClick={download} setNameShow={setNameShow} setShowModalView={setShowModalView}/>
        <div className="formRow">
            <div className="col-sm-3 offset-sm-9">
                <label>Total: ${props.total}</label>
            </div>
        </div>
        <Buttons label='Siguiente' ready={props.detailsDelivery.length>0?true:false} actionCancel={() => {props.setStep(1)}} actionNotOK={() => {errorNextStepOne()}} actionOK={() => {props.setStep(2)}} />
    </>)
}

const mapStateToProps = state => {
    return {
        detailsDelivery: state.detailsDelivery,
        total: state.totalDelivery,
        flavorsProduct: state.flavorsProductDelivery,
        products: state.productsDelivery
    }
}

const mapDispatchToProps = {
    addDetailDelivery,
    updateAllFlavorsProduct,
    sumTotalDelivery,
    deleteDetailDelivery,
    subtractTotalDelivery,
    updateDeliveryProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);