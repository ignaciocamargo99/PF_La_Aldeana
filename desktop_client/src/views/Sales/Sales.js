import React, { useEffect, useState } from "react";
import DetailSale from './components/DetailSale';
import DateFormat from '../../utils/DateFormat/dateFormat';
import ListProducts from './components/ListProducts';
import FilterProducts from './components/FilterProducts';
import PaymentSale from "./components/PaymentSale";
import {
    updateProducts, updateProductsFiltered, updateDetailProducts, updateProductSelected, updateProductsXSupplies,
    updateSupplies, updatePaymentAmount, updateDetailsProductsClear, updateSalesRegister
} from '../../actions/SalesActions';
import Axios from "axios";
import { connect } from 'react-redux';
import Buttons from "../../common/Buttons";
import warningMessage from "../../utils/warningMessage";
import dateTimeFormat from "../../utils/DateFormat/dateTimeFormat";
import '../../assets/Buttons.css';
import { printSaleTicket, printCafeteriaTicket, printHeladeriaTicket } from "../../ticket/print";
import { formatDateToString, formatTimeToString } from "../../utils/DateFormat/dateTimeFormatV2";

const PORT = require('../../config');

const Sales = (props) => {

    const [ready, setReady] = useState(false);
    const [saleCompleted, setSaleCompleted] = useState(false);
    const [date, setDate] = useState('');

    useEffect(() => {
        initialCalls();
    }, [])

    useEffect(() => {
        let date = DateFormat(new Date())
        setDate(date)
    }, [])

    const initialCalls = () => {
        Axios.get(`${PORT()}/api/products`)
            .then(response => {
                let aux = response.data;
                aux?.map((element, i) => {
                    element.listSupplies = [];
                    element.disabled = false;
                    element.stock_current = element.stock;
                });
                props.updateProducts(aux);
                props.updateProductsFiltered(aux);
            })
            .catch(error => console.error(error));

        Axios.get(`${PORT()}/api/productxsupply`)
            .then(response => {
                props.updateProductsXSupplies(response.data);
            })
            .catch(error => console.error(error));

        Axios.get(`${PORT()}/api/supplies`)
            .then(response => {
                props.updateSupplies(response.data);
            })
            .catch(error => console.error(error));
    }

    useEffect(() => {
        if (props.detailProducts.length > 0 && ((props.payType == 1 && props.paymentAmount >= props.totalAmount) || props.payType == 2)) {
            setReady(true);
        }
        else {
            setReady(false);
        }
    })

    useEffect(() => {
        let aux = props.productsFiltered;
        for (let i = 0; i < aux.length; i++) {
            if (aux[i].stock_current == 0) {
                aux[i].disabled = true;
            }
            else {
                aux[i].disabled = false;
            }
        }
        props.updateProductsFiltered(aux);
    }, [props.productsFiltered, props.detailProducts, props.refresh])

    const cancel = () => {
        resetStates();
    }

    const resetStates = () => {
        props.updateDetailsProductsClear([]);
        initialCalls();
        setSaleCompleted(!saleCompleted);
        props.updateSalesRegister(!props.salesRegister);
    }

    const agg_suplies = () => {
        let suppliesXproduct;
        for (let i = 0; i < props.detailProducts.length; i++) {
            suppliesXproduct = props.productsXsupplies.filter(item => item.id_product == props.detailProducts[i].id_product)
            for (let j = 0; j < suppliesXproduct.length; j++) {
                props.detailProducts[i].listSupplies.push([suppliesXproduct[j].number_supply, props.supplies.find(supply => supply.id_supply == suppliesXproduct[j].id_supply)])
            }
        }
    }

    const printSaleTickets = ({ date, details, time, total }) => {

        // sale ticket
        let items = [];
        // heladeria ticket
        let heladeriaItems = [];
        // cafeteria ticket
        let cafeteriaItems = [];

        for (let i = 0; i < details.length; i++) {
            const { name, price, quantity, subtotal, id_sector } = details[i];
            console.log(details[i])

            // sale ticket
            items.push({
                name: name,
                unitPrice: `${+price},00`,
                amount: `${+quantity},00`,
                subtotal: `${+subtotal},00`,
            })

            // heladeria ticket
            if (+id_sector === 1) {
                heladeriaItems.push({
                    name: name,
                    amount: `${+quantity},00`,
                });

                continue;
            }

            // cafeteria ticket
            if (+id_sector === 2) {
                cafeteriaItems.push({
                    name: name,
                    amount: `${+quantity},00`,
                });

                continue;
            }
        }

        const saleDataToPrint = {
            date: date,
            time: time,
            items: items,
            total: `${+total},00`,
        }

        const heladeriaDataToPrint = {
            date: date,
            time: time,
            items: heladeriaItems,
        }

        const cafeteriaDataToPrint = {
            date: date,
            time: time,
            items: cafeteriaItems,
        }

        printSaleTicket(saleDataToPrint);

        if (heladeriaItems.length > 0) {
            printHeladeriaTicket(heladeriaDataToPrint);
        }

        if (cafeteriaItems.length > 0) {
            printCafeteriaTicket(cafeteriaDataToPrint)
        }
    }

    const getSaleModels = () => {
        const currentDate = new Date();

        const salePayload = {
            date_hour: dateTimeFormat(currentDate),
            details: JSON.stringify(props.detailProducts),
            id_pay_type: props.payType,
            total_amount: props.totalAmount,
        };

        const saleData = {
            date: formatDateToString(currentDate),
            details: props.detailProducts,
            time: formatTimeToString(currentDate),
            total: props.totalAmount,
        };

        return [salePayload, saleData];
    }

    const registerSale = () => {
        if (ready) {
            agg_suplies();

            const [salePayload, saleData] = getSaleModels();

            Axios.post(`${PORT()}/api/sales`, salePayload)
                .then((response) => {
                    if (response.data.Ok) {
                        resetStates();
                        warningMessage("Éxito!", "Se registró la venta con éxito", "success");
                        printSaleTickets(saleData);
                    }
                    else warningMessage('¡Error!', 'Ha ocurrido un error al registrar la venta.', "error");
                })
                .catch(error => console.log(error))
        }
        else {
            if (props.detailProducts.length == 0) {
                warningMessage("¡Error!", "No se cargó ningún producto", "error");
            }
            else if (props.payType != 1 && props.payType != 2) {
                warningMessage("¡Error!", "No seleccionó la forma de pago", "error");
            }
            else if (props.payType == 1 && props.paymentAmount <= props.totalAmount) {
                warningMessage("¡Error!", "El monto ingresado es inferior al monto total", "error");
            }
        }
    }

    return (
        <>
            <div className="viewContent">
                <h1 className="display-5">Registrar venta en Local</h1>
                <hr />
                <div className="formRow" style={{ justifyContent: 'flex-end' }}>
                    <div className="form-label-no-margin" style={{ marginRight: '0%' }}>
                        <label>Fecha:</label>
                    </div>
                    <div className="" style={{ width: '200px' }}>
                        <input type="date" className="form-control" value={date} readOnly></input>
                    </div>
                </div>
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
                        <h3><b>Detalle de venta</b></h3>
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
        salesRegister: state.salesRegister,
        refresh: state.refresh
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