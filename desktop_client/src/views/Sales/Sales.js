import React, { useEffect, useState } from "react";
import DetailSale from './components/DetailSale';
import ListProducts from './components/ListProducts';
import FilterProducts from './components/FilterProducts';
import PaymentSale from "./components/PaymentSale"; 
import { updateProducts, updateProductsFiltered, updateDetailProducts, updateProductSelected, updateProductsXSupplies, 
    updateSupplies, updatePaymentAmount, updateDetailsProductsClear, updateSalesRegister } from '../../actions/SalesActions';
import Axios from "axios";
import { connect } from 'react-redux';
import Buttons from "../../common/Buttons";
import warningMessage from "../../utils/warningMessage";
import dateTimeFormat from "../../utils/DateFormat/dateTimeFormat";
import '../../assets/Buttons.css';

const PORT = require('../../config');

const Sales = (props) => { 

    const [ready, setReady] = useState(false);
    const [readyStock1, setReadyStock1] = useState(false);
    const [readyStock2, setReadyStock2] = useState(false);
    const [readyStock3, setReadyStock3] = useState(false);
    const [saleCompleted, setSaleCompleted] = useState(false);

    useEffect(() => {
        initialCalls();
    },[])

    const initialCalls = () => {
        Axios.get(`${PORT()}/api/products`)
            .then(response => {
                let aux = response.data;
                aux?.map((element, i) => {
                    element.stock_initial = 0;
                    element.stock_current = 0;
                    element.listSupplies = [];
                });
                props.updateProducts(aux);
                props.updateProductsFiltered(aux);
                setReadyStock1(true);
            })
            .catch(error => console.error(error));

        Axios.get(`${PORT()}/api/productxsupply`)
            .then(response => {
                props.updateProductsXSupplies(response.data);
                setReadyStock2(true);
            })
            .catch(error => console.error(error));

        Axios.get(`${PORT()}/api/supplies`)
            .then(response => {
                props.updateSupplies(response.data);
                setReadyStock3(true);
            })
            .catch(error => console.error(error));
    }

    useEffect(() => {
        if (readyStock1 && readyStock2 && readyStock3)
        {
            thereIsStock(); 
        }
    },[readyStock1, readyStock2, readyStock3])

    const thereIsStock = () => {
        let aux = props.products;
        let i,j,k,l,next_stock;
        let auxSuppliesXProduct = [];

        for (i = 0; i < aux.length; i++) {
            for (j = 0; j < props.productsXsupplies.length; j++) {
                if (aux[i].id_product == props.productsXsupplies[j].id_product) {
                    auxSuppliesXProduct.push(props.productsXsupplies[j]);
                }   
            }
            if (auxSuppliesXProduct.length > 0) {
                for (k = 0; k < auxSuppliesXProduct.length; k++) {
                    for (l = 0; l < props.supplies.length; l++) {
                        if (auxSuppliesXProduct[k].id_supply == props.supplies[l].id_supply)
                        {
                            aux[i].listSupplies.push([auxSuppliesXProduct[k].number_supply, props.supplies[l]]);
                            if (props.supplies[l].id_supply_type == 3)
                            {
                                aux[i].stock_initial = 99999;
                                aux[i].stock_current = 99999;
                            }
                            else 
                            {
                                if (auxSuppliesXProduct[k].number_supply >= props.supplies[l].stock_unit)
                                {
                                    document.getElementById(`btn_${aux[i].id_product}`).disabled = true;
                                    aux[i].stock_initial = 0;
                                    aux[i].stock_current = 0;
                                    break;
                                }
                                else
                                {
                                    if (aux[i].stock_initial == 0)
                                    {
                                        aux[i].stock_initial = props.supplies[l].stock_unit / auxSuppliesXProduct[k].number_supply;
                                        aux[i].stock_current = props.supplies[l].stock_unit / auxSuppliesXProduct[k].number_supply;
                                    }
                                    else   
                                    {
                                        next_stock = props.supplies[l].stock_unit / auxSuppliesXProduct[k].number_supply;
                                        if (next_stock < aux[i].stock_initial) 
                                        {   
                                            aux[i].stock_initial = props.supplies[l].stock_unit / auxSuppliesXProduct[k].number_supply;
                                            aux[i].stock_current = props.supplies[l].stock_unit / auxSuppliesXProduct[k].number_supply;
                                        }
                                    }
                                }
                            }
                            
                        }
                    }
                }
            }
            auxSuppliesXProduct = [];
        }
        props.updateProducts(aux);
        props.updateProductsFiltered(aux);
    }

    useEffect(() => {
        if (props.detailProducts.length > 0 && ((props.payType == 1 && props.paymentAmount >= props.totalAmount) || props.payType == 2)) {
            setReady(true);
        }
        else {
            setReady(false);
        }
    })

    const cancel = () => {
        resetStates();
    }

    const resetStates = () => {
        props.updateDetailsProductsClear([]);
        setReadyStock1(false);
        setReadyStock2(false);
        setReadyStock3(false);
        initialCalls();
        setSaleCompleted(!saleCompleted);
        props.updateSalesRegister(!props.salesRegister);
    }

    const registerSale = () => {
        if (ready) {
            let sale = {
                date_hour: dateTimeFormat(new Date()), total_amount: props.totalAmount,
                id_pay_type: props.payType, details: JSON.stringify(props.detailProducts)
            };

            Axios.post(`${PORT()}/api/sales`, sale)
                .then((sale) => {
                    if (sale.data.Ok) {
                        resetStates();
                        warningMessage("Exito!", "Se registró la venta con exito", "success");
                    }
                    else warningMessage('¡Error!', 'Ha ocurrido un error al registrar la venta.', "error");
                })
                .catch(error => console.log(error))
        }
        else {
            if (props.detailProducts.length == 0) {
                warningMessage("¡Error!", "No se cargo ningun producto", "error");
            }
            else if (props.payType != 1 && props.payType != 2) {
                warningMessage("¡Error!", "No selecciono la forma de pago", "error");
            }
            else if (props.payType == 1 && props.paymentAmount <= props.totalAmount)
            {
                warningMessage("¡Error!", "El monto ingresado es inferior al monto total", "error");
            }
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
                            <Buttons label="Registrar" ready={ready} actionOK={registerSale}
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
        totalAmount: state.totalAmount,
        supplies: state.supplies,
        productsXsupplies: state.productsXsupplies,
        paymentAmount: state.paymentAmount,
        salesRegister: state.salesRegister
    }
}

const mapDispatchToProps = {
    updateProducts,
    updateProductsFiltered,
    updateDetailProducts,
    updateProductSelected,
    updateProductsXSupplies, 
    updateSupplies,
    updatePaymentAmount,
    updateDetailsProductsClear,
    updateSalesRegister
}

export default connect(mapStateToProps, mapDispatchToProps)(Sales);