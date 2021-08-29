import React, {useEffect, useState} from "react";
import DetailSale from './components/DetailSale';
import ListProducts from './components/ListProducts';
import FilterProducts from './components/FilterProducts';
import PaymentSale from "./components/PaymentSale";
import { updateProducts, updateProductsFiltered, updateDetailProducts, updatePayType, updateTotalAmount, updateProductSelected } from '../../actions/SalesActions';
import Axios from "axios";
import { connect } from 'react-redux';
import Buttons from "../../common/Buttons";
import warningMessage from "../../utils/warningMessage";
import dateFormat from "../../utils/DateFormat/dateFormat";

const PORT = require('../../config');

const Sales = (props) => {
    
    const [ready, setReady] = useState(false);

    useEffect(() => {
        Axios.get(`${PORT()}/api/allProducts`) 
            .then(response => {
                props.updateProducts(response.data);
                props.updateProductsFiltered(response.data);
            })
            .catch(error => console.error(error))
    },[])

    useEffect(() => {
        //faltan validaciones para activar el boton de ventas
        setReady(true);   
    })

    const cancel = () => {
        window.location.reload();
    }

    const registerSale = () => {
        if (ready) {
            
            let sale = { date_hour: dateFormat(new Date()), total_amount:props.totalAmount, id_pay_type:props.payType, details:JSON.stringify(props.detailProducts)}; 

            console.log(sale);

            Axios.post(`${PORT()}/api/sales/new`, sale)
            .then((sale) => {
                if(sale.data.Ok) warningMessage("Exito!","Se registro la venta con exito","success");
                else warningMessage('Error!!','Ha ocurrido un error al registrar la venta. \n' + sale.data.Message,"error");
            })
            .catch(error => console.log(error))
        }
        else {
            warningMessage("Error!!!","faltan cosas de cargar","error");
        }
    }

    return(
        <>
            <div className="viewContent">
                <h1 className="display-5">Ventas</h1>  
                <hr/>
                <div className="row">
                    <div className="col-8">
                        <h3>Seleccione los productos...</h3>
                        <FilterProducts></FilterProducts>
                        <ListProducts></ListProducts>
                    </div>

                    <div className="col-4">
                        <h3>Detalle de la venta</h3>
                        <DetailSale></DetailSale>
                        <PaymentSale></PaymentSale>
                        <div>
                            <Buttons label="Registrar Venta" ready={ready} actionOK={registerSale} 
                            actionNotOK={registerSale} actionCancel={cancel}></Buttons>
                        </div>
                    </div>
                </div> 
            </div>
        </>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(Sales);