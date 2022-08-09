import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import BeShowed from 'common/BeShowed';
import Buttons from 'common/Buttons';

import Pay from './Pay';
import Client from './Client';
import Products from './Products';
import {
    updateErrorStreetNumberDelivery, updateStreetNumberDelivery, updateErrorStreetDelivery, updateStreetDelivery, updateErrorNamesDelivery,
    updateNamesDelivery, updateErrorCellphoneDelivery, updateCellphoneDelivery, updateErrorAmountDelivery, updateAmountDelivery, resetDetailDelivery,
    updateDeliveryProductsQuantities, subtractTotalDelivery, updateDeliveryProductsStocks, updateProductsXSuppliesDelivery, updateSuppliesDelivery
} from '../../../actions/DeliverySalesActions';

import DateFormat from 'utils/DateFormat/dateFormat';
import dateTimeFormat from 'utils/DateFormat/dateTimeFormat'
import errorNextStepTwo from 'utils/ErrorMessages/errorNextStepTwo';
import loadingMessage from 'utils/LoadingMessages/loadingMessage';
import succesMessageDeliverySale from 'utils/SuccessMessages/successMessageDeliverySale';
import warningMessage from 'utils/warningMessage';
//import calculateProductStock from '../../../utils/CalculateProductStock/calculateProductStock';

import '../styles/DeliverySales.css';
import { printDeliverySaleTicket } from './printDeliverySaleTicket';

const PORT = require('../../../config');

const DeliverySales = (props) => {
    const [step, setStep] = useState(1);
    const [date, setDate] = useState('');
    const [reset, setReset] = useState(false);
    const [loadSpinner, setLoadSpinner] = useState(true)
    const [clientObservation, setClientObservation] = useState('');

    useEffect(() => {
        let date = DateFormat(new Date())
        setDate(date)
    }, [])

    useEffect(() => {
        axios.get(PORT() + `/api/products/delivery`)
            .then((response) => {
                let aux = [];
                for (let i = 0; i < response.data.length; i++) {
                    aux.push({ 'product': response.data[i], 'quantity': 0 });
                }
                axios.get(PORT() + `/api/productsStocks`)
                    .then((response) => {
                        props.updateDeliveryProductsStocks(response.data);
                        props.updateDeliveryProductsQuantities(aux);
                        setLoadSpinner(false)
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
            .catch((err) => {
                console.log(err);
            })
        axios.get(`${PORT()}/api/productxsupply`)
            .then((response) => props.updateProductsXSuppliesDelivery(response.data))
            .catch((error) => console.error(error));

        axios.get(`${PORT()}/api/supplies`)
            .then((response) => props.updateSuppliesDelivery(response.data))
            .catch((error) => console.error(error));

    }, [reset]);

    const confirmSale = () => {

        const clientDataForTicket = {
            name: props.names?.trim(),
            cellphone: props.cellphone,
            street: props.street?.trim(),
            streetNumber: props.streetNumber,
            obs: clientObservation?.trim(),
        }

        loadingMessage('Procesando la venta')
        if (props.client.names === '') {
            const postClientPayload = {
                "cellphone": props.cellphone,
                "names": props.names,
                "observation": clientObservation,
                "street_name": props.street,
                "street_number": props.streetNumber,
            };
            axios.post(`${PORT()}/api/clients`, postClientPayload)
        }
        else if (props.client.street_name !== props.street || props.client.street_number !== props.streetNumber) {
            const putClientPayload = {
                "street_name": props.street,
                "street_number": props.streetNumber,
                "observation": clientObservation,
            };
            axios.put(`${PORT()}/api/clients/${props.client.cellphone}`, putClientPayload)
        }

        let details = []
        props.details.map((detail, i) => {
            details.push(
                {
                    "id_product": detail.product.id_product,
                    "quantity": detail.quantity,
                    "subtotal": detail.subtotal
                }
            );
        });

        const currentDate = new Date();

        let sale = {
            cellphone_client: props.cellphone,
            date_hour: dateTimeFormat(currentDate),
            details: JSON.stringify(details),
            id_pay_type: 1,
            total_amount: props.total,
        };

        axios.post(`${PORT()}/api/salesDelivery`, sale)
            .then((sale) => {
                if (sale.data.Ok) {
                    resetStates(false);
                    printDeliverySaleTicket(currentDate, clientDataForTicket, props.details, props.total, props.amount)
                        .catch(err => {
                            console.error(err)
                        })
                }
                else warningMessage('Error', 'Ha ocurrido un error al registrar la venta. \n' + sale.data.Message, "error");
            })
            .catch(error => console.log(error))
    }

    const resetStates = (cancel) => {
        setStep(1);
        props.resetDetailDelivery();
        props.updateErrorStreetNumberDelivery(true);
        props.updateStreetNumberDelivery('');
        props.updateErrorStreetDelivery(true);
        props.updateStreetDelivery('');
        props.updateErrorNamesDelivery(true);
        props.updateNamesDelivery('');
        props.updateErrorCellphoneDelivery(true);
        props.updateCellphoneDelivery('');
        props.updateErrorAmountDelivery(true);
        props.updateAmountDelivery('');
        props.subtractTotalDelivery(props.total);
        if (!cancel) {
            succesMessageDeliverySale('Venta registrada exitosamente');
        }
        props.updateDeliveryProductsQuantities([])
        setClientObservation('');
        setReset(!reset)
    }

    return (
        <>
            <div className="viewContent">
                <h1 className="display-5">Registrar venta por delivery</h1>
                <hr />
                <div className="formRow" style={{ justifyContent: 'flex-end' }}>
                    <div className="form-label-no-margin" style={{ marginRight: '0%' }}>
                        <label>Fecha:</label>
                    </div>
                    <div className="" style={{ width: '200px' }}>
                        <input type="date" className="form-control" value={date} readOnly></input>
                    </div>
                </div>

                <BeShowed show={step === 1}>
                    <Products setStep={setStep} resetStates={resetStates} loadSpinner={loadSpinner} />
                </BeShowed>

                <BeShowed show={step === 2}>
                    <Client setStep={setStep} clientObservation={clientObservation} setClientObservation={setClientObservation} />
                    <Pay />
                    <Buttons label='Registrar' cancel='Atrás' ready={(!props.errorCellphone && !props.errorNames && !props.errorStreet && !props.errorStreetNumber && !props.errorAmount)} actionCancel={() => { setStep(1) }} actionNotOK={() => { errorNextStepTwo() }} actionOK={confirmSale} />
                </BeShowed>

                <BeShowed show={step === 3}>
                    <Pay setStep={setStep} />
                </BeShowed>

            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        errorStreetNumber: state.errorStreetNumberDelivery, errorNames: state.errorNamesDelivery,
        errorStreet: state.errorStreetDelivery, errorCellphone: state.errorCellphoneDelivery,
        errorAmount: state.errorAmountDelivery, details: state.detailsDelivery,
        total: state.totalDelivery, cellphone: state.cellphoneDelivery, client: state.clientDelivery,
        amount: state.amountDelivery,
        names: state.namesDelivery, street: state.streetDelivery, streetNumber: state.streetNumberDelivery,
        productsXsuppliesDelivery: state.productsXsuppliesDelivery, suppliesDelivery: state.suppliesDelivery
    }
}

const mapDispatchToProps = {
    updateDeliveryProductsQuantities, resetDetailDelivery, updateErrorStreetNumberDelivery,
    updateStreetNumberDelivery, updateErrorStreetDelivery, updateStreetDelivery, updateErrorNamesDelivery,
    updateNamesDelivery, updateErrorCellphoneDelivery, updateCellphoneDelivery, updateErrorAmountDelivery,
    updateAmountDelivery, subtractTotalDelivery, updateDeliveryProductsStocks, updateProductsXSuppliesDelivery,
    updateSuppliesDelivery
}

export default connect(mapStateToProps, mapDispatchToProps)(DeliverySales);