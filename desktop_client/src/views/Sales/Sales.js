import Axios from 'axios';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    updateDetailProducts,
    updateDetailsProductsClear,
    updatePaymentAmount,
    updateProducts,
    updateProductSelected,
    updateProductsFiltered,
    updateProductsXSupplies,
    updateSalesRegister,
    updateSupplies
} from 'actions/SalesActions';

import '../../assets/Buttons.css';

import BeShowed from 'common/BeShowed';

import DetailSale from './components/DetailSale';
import FilterProducts from './components/FilterProducts';
import ListProducts from './components/ListProducts';
import PaymentSale from './components/PaymentSale';
import printHeladeriaTicket from 'ticket/print';
import printCafeteriaTicket from 'ticket/print';
import printSaleTicket from 'ticket/print';
import dateTimeFormat from 'utils/DateFormat/dateTimeFormat';
import errorMessageV2 from 'utils/ErrorMessages/errorMessageV2';
import successMessageV2 from 'utils/SuccessMessages/successMessageV2';
import warningMessageV2 from 'utils/WarningMessages/warningMessageV2';
import { defaultQuestionSweetAlert2 } from 'utils/sweetAlert2Questions';
import { formatDateToString, formatTimeToString } from "utils/DateFormat/dateTimeFormatV2";
import { loadingMessageV2 } from 'utils/LoadingMessages/loadingMessageV2';
import Swal from 'sweetalert2';

const PORT = require('../../config');

const Sales = (props) => {
    const [ready, setReady] = useState(false);
    const [saleCompleted, setSaleCompleted] = useState(false);
    const [nameClient, setNameClient] = useState('');

    useEffect(() => {
        props.updateDetailsProductsClear([]);

        Axios.get(`${PORT()}/api/products`)
            .then((response) => {
                let aux = response.data;
                aux?.map((element, i) => {
                    element.listSupplies = [];
                    element.disabled = false;
                    element.stock_current = element.stock;
                });
                props.updateProducts(aux);
                props.updateProductsFiltered(aux);
            })
            .catch((error) => console.error(error));

        Axios.get(`${PORT()}/api/productxsupply`)
            .then((response) => props.updateProductsXSupplies(response.data))
            .catch((error) => console.error(error));

        Axios.get(`${PORT()}/api/supplies`)
            .then((response) => props.updateSupplies(response.data))
            .catch((error) => console.error(error));


    }, []);

    useEffect(() => {
        if (
            props.detailProducts.length > 0 &&
            ((props.payType == 1 && props.paymentAmount >= props.totalAmount) ||
                props.payType == 2)
        )
            setReady(true);
        else setReady(false);
    });

    useEffect(() => {
        let aux = props.productsFiltered;
        for (let i = 0; i < aux.length; i++) {
            if (aux[i].stock_current == 0) aux[i].disabled = true;
            else aux[i].disabled = false;
        }
        props.updateProductsFiltered(aux);
    }, [props.productsFiltered, props.detailProducts, props.refresh]);

    const resetStates = () => {
        props.updateDetailsProductsClear([]);
        setNameClient('');
        setSaleCompleted(!saleCompleted);
        props.updateSalesRegister(!props.salesRegister);
    };

    const agg_suplies = () => {
        let suppliesXproduct;
        for (let i = 0; i < props.detailProducts.length; i++) {
            suppliesXproduct = props.productsXsupplies.filter(
                (item) => item.id_product == props.detailProducts[i].id_product
            );
            for (let j = 0; j < suppliesXproduct.length; j++) {
                props.detailProducts[i].listSupplies.push([
                    suppliesXproduct[j].number_supply,
                    props.supplies.find((supply) => supply.id_supply == suppliesXproduct[j].id_supply)
                ]);
            }
        }
    };

    const handleClientName = (e) => setNameClient(e.target.value);

    const updateStockSupplies = () => {
        Axios.put(`${PORT()}/api/suppliesStock`, props.supplies)
            .catch(error => console.error(error))
    }

    const registerSale = () => {
        const [salePayload, saleData] = getSaleModels();

        agg_suplies();

        loadingMessageV2('Registrando venta...');

        Axios.post(`${PORT()}/api/sales`, salePayload)
            .then((response) => {
                if (response.data.Ok) {
                    updateStockSupplies();
                    resetStates()

                    let text = 'Se registró la venta con éxito.';

                    if (props.payType == 1 && props.totalAmount < props.paymentAmount) {
                        const change = parseFloat(props.paymentAmount) - parseFloat(props.totalAmount);
                        text += "\n"
                        text += `¡No se olvide de darle el vuelto de $${change} al cliente!`;
                    }

                    successMessageV2(text);
                    handlePrintSaleTickets(saleData, response.data.saleId);
                } else {
                    errorMessageV2('Ha ocurrido un error al registrar la venta.');
                }
            })
            .catch((error) => {
                console.log(error);
                errorMessageV2('Ha ocurrido un error al registrar la venta.');
            });
    }

    const validateSaleRegistration = async () => {
        if (!ready) {
            printWarningOnRegister();
            return;
        }

        const registrationConfirmed = (await defaultQuestionSweetAlert2(`¿Confirma la venta?`)).isConfirmed;

        if (registrationConfirmed) {
            registerSale();
        }
    }

    const printWarningOnRegister = () => {
        if (props.detailProducts.length === 0) {
            warningMessageV2('No cargó ningún producto.');
        }
        else if (props.payType != 1 && props.payType != 2) {
            warningMessageV2('No seleccionó la forma de pago.');
        }
        else if (props.payType == 1 && props.paymentAmount <= props.totalAmount) {
            warningMessageV2('El monto ingresado es inferior al monto total.');
        }
    }

    const printTickets = (generalDataToPrint, saleDataToPrint, heladeriaDataToPrint, cafeteriaDataToPrint) => {
        // EMISIÓN TICKET VENTA
        printSaleTicket(generalDataToPrint, saleDataToPrint);

        // EMISIÓN TICKET HELADERÍA
        if (heladeriaDataToPrint?.items?.length > 0) {
            loadingMessageV2('Emitiendo ticket...')
            setTimeout(() => {
                Swal.fire('Retire el ticket de venta.').then((result) => {
                    if (result.isConfirmed) {
                        printHeladeriaTicket(generalDataToPrint, heladeriaDataToPrint);
                    }
                })
            }, 3500);
        }

        // EMISIÓN TICKET CAFETERÍA
        if (cafeteriaDataToPrint?.items?.length > 0) {
            printCafeteriaTicket(generalDataToPrint, cafeteriaDataToPrint)
        }
    }

    const handlePrintSaleTickets = ({ date, details, time, total }, saleId) => {

        // items venta ticket
        let items = [];
        // items heladeria ticket
        let heladeriaItems = [];
        // items cafeteria ticket
        let cafeteriaItems = [];

        for (let i = 0; i < details.length; i++) {
            const { name, price, quantity, subtotal, id_sector, descriptionProduct } = details[i];

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
                    obs: descriptionProduct,
                });

                continue;
            }

            // cafeteria ticket
            if (+id_sector === 2) {
                cafeteriaItems.push({
                    name: name,
                    amount: `${+quantity},00`,
                    obs: descriptionProduct,
                });

                continue;
            }
        }

        let ticketCode = String(saleId).slice(-2);
        ticketCode = ticketCode.length === 1 ? `0${ticketCode}` : ticketCode

        // 1. generalDataToPrint
        const generalDataToPrint = {
            date: date,
            time: time,
            ticketCode: ticketCode,
        }

        // 2. saleDataToPrint
        let saleDataToPrint = {
            items: items,
            total: `${+total},00`,
        }
        if (props.payType == 1) {
            // EFECTIVO
            saleDataToPrint.payInCash = true;
            saleDataToPrint.change = `${+props.paymentAmount - +props.totalAmount},00`;
            saleDataToPrint.cashReceived = `${+props.paymentAmount},00`;
        }

        // 3. heladeriaDataToPrint
        const heladeriaDataToPrint = { items: heladeriaItems }

        // 4. cafeteriaDataToPrint
        const cafeteriaDataToPrint = { items: cafeteriaItems, nameClient: nameClient }

        printTickets(generalDataToPrint, saleDataToPrint, heladeriaDataToPrint, cafeteriaDataToPrint);
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

    return (
        <>
            <div className='viewContent'>
                <div className='row'>
                    <div className='col-6'>
                        <div className='row'>
                            <FilterProducts />
                        </div>
                        <div className='row'>
                            <ListProducts />
                        </div>
                    </div>
                    <div className='col-6' style={{ padding: '0px 0px 0px' }}>
                        <h3>
                            <b>Detalle de venta</b>
                        </h3>
                        <DetailSale />
                        <hr />
                        <h3>
                            <b>Cliente</b>
                            <br />
                            <div className='input-group'>
                                <div className='input-group-prepend'>
                                    <span
                                        className='input-group-text'
                                        style={{ height: '100%' }}
                                    >
                                        Nombre
                                    </span>
                                </div>
                                <input
                                    id='clientName'
                                    type='text'
                                    className='form-control'
                                    onChange={(e) => handleClientName(e)}
                                    value={nameClient}
                                />
                            </div>
                        </h3>
                        <PaymentSale />
                        <div>
                            <div className='buttons'>
                                <BeShowed show={ready}>
                                    <button className='btn btn-light sendOk' onClick={validateSaleRegistration}>Finalizar</button>
                                </BeShowed>
                                <BeShowed show={!ready}>
                                    <button className='btn btn-light sendNotOk' onClick={validateSaleRegistration}>Finalizar</button>
                                </BeShowed>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
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
    };
};

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
};

export default connect(mapStateToProps, mapDispatchToProps)(Sales);
