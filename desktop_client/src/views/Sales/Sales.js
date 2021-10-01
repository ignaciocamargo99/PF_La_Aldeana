import React, { useEffect, useState } from "react";
import DetailSale from './components/DetailSale';
import ListProducts from './components/ListProducts';
import FilterProducts from './components/FilterProducts';
import PaymentSale from "./components/PaymentSale";
import { updateProducts, updateProductsFiltered, updateDetailProducts, updatePayType, updateTotalAmount, updateProductSelected } from '../../actions/SalesActions';
import Axios from "axios";
import { connect } from 'react-redux';
import Buttons from "../../common/Buttons";
import warningMessage from "../../utils/warningMessage";
import dateTimeFormat from "../../utils/DateFormat/dateTimeFormat";
import '../../assets/Buttons.css'

const PORT = require('../../config');

const Sales = (props) => {

    const [ready, setReady] = useState(false);

    useEffect(() => {
        Axios.get(`${PORT()}/api/products`)
            .then(response => {
                props.updateProducts(response.data);
                props.updateProductsFiltered(response.data);
            })
            .catch(error => console.error(error))
    }, [])

    useEffect(() => {
        if (props.detailProducts.length > 0 && (props.payType == 1 || props.payType == 2)) {
            setReady(true);
        }
        else {
            setReady(false);
        }

    })

    const cancel = () => {
        window.location.reload();
    }

    const registerSale = () => {
        if (ready) {
            let sale = {
                date_hour: dateTimeFormat(new Date()), total_amount: props.totalAmount,
                id_pay_type: props.payType, details: JSON.stringify(props.detailProducts)
            };

            Axios.post(`${PORT()}/api/sales`, sale)
                .then((sale) => {
                    if (sale.data.Ok) warningMessage("Exito!", "Se registró la venta con exito", "success");
                    else warningMessage('¡Error!', 'Ha ocurrido un error al registrar la venta.', "error");
                })
                .catch(error => console.log(error))
        }
        else {
            warningMessage("¡Error!", "Faltan cosas de cargar", "error");
        }
    }

    return (
        <>
            <div className="viewContent">
                <h1 className="display-5">Ventas</h1>
                <hr />
                <div className="row">
                    <div className="col-6">
                        <FilterProducts />
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        <ListProducts />
                    </div>
                    <div className="col-4">
                        <h3>Detalle de la venta</h3>
                        <DetailSale />
                        <PaymentSale />
                        <div>
                            <Buttons label="Registrar Venta" ready={ready} actionOK={registerSale}
                                actionNotOK={registerSale} actionCancel={cancel}></Buttons>
                        </div>
                    </div>
                </div>



                {/* <div className="row">
                    <div className="col-8">
                        <ListProducts />
                    </div>
                </div> */}

                {/* <div className="row">
                    <div className="col-8">
                        <h3>Seleccione los productos...</h3>
                        <div className="col-4">
                            <FilterProducts />
                        </div>
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
                </div> */}
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