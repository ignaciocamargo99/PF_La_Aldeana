import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import DateFormat from '../../../utils/DateFormat/dateFormat';
import BeShowed from '../../../common/BeShowed';
import Pay from './Pay';
import Client from './Client';
import Products from './Products';
import { updateDeliveryClients,updateDeliveryProducts } from '../../../actions/DeliverySalesActions';
import Buttons from '../../../common/Buttons';
import errorNextStepTwo from '../../../utils/ErrorMessages/errorNextStepTwo';
import succesMessageDeliverySale from '../../../utils/SuccessMessages/successMessageDeliverySale';
import dateTimeFormat from '../../../utils/DateFormat/dateTimeFormat'
import warningMessage from '../../../utils/warningMessage';

const PORT = require('../../../config');

const DeliverySales = (props) => {
    const [step,setStep] = useState(1);
    const [date,setDate] = useState('');

    useEffect(() => {
        let date = DateFormat(new Date())
        setDate(date)   
        axios.get( PORT() + `/api/allProducts`)
        .then((response) => {
            props.updateDeliveryProducts(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
        axios.get( PORT() + `/api/clients`)
        .then((response) => {
            props.updateDeliveryClients(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

    const confirmSale = () => {
        let details = []
        props.details.map((detail,i) => {
            details.push(
                {
                    "id_product": detail.product.id_product,
                    "quantity": detail.quantity,
                    "subtotal": detail.subtotal
                }
            )
        })
        let sale = { date_hour: dateTimeFormat(new Date()), total_amount:props.total, id_pay_type:1, cellphone_client:props.cellphone, details:JSON.stringify(details)}; 
        axios.post(`${PORT()}/api/sales/new`, sale)
            .then((sale) => {
                if(sale.data.Ok) {
                    succesMessageDeliverySale('Se ha registrado la venta correctamente');       
                }
                else warningMessage('Error!!','Ha ocurrido un error al registrar la venta. \n' + sale.data.Message,"error");
            })
            .catch(error => console.log(error))
        /*
        let client = {cellphone:props.cellphone,names:props.names}
        let address = {street_name:props.street,street_number:props.streetNumber,cellphone_number:props.cellphone}
        */
    }

    return(
        <>
            <div className="viewContent">
                <h1 className="display-5">Registrar venta por delivery</h1>
                <hr />
                <div className="formRow" style={{justifyContent:'flex-end'}}>
                    <div className="form-control-label col-sm-1">
                        <label>Fecha:</label>
                    </div>
                    <div className="form-control-input col-sm-2" style={{width:'200px'}}>
                        <input type="date" className="form-control" value={date} readOnly></input>
                    </div>
                </div>

                <BeShowed show={step===1}>
                    <Products setStep={setStep}/>
                </BeShowed>
                
                <BeShowed show={step===2}>
                    <Client setStep={setStep}/>
                    <Pay />
                    <Buttons label='Confirmar' ready={(!props.errorCellphone && !props.errorNames && !props.errorStreet && !props.errorStreetNumber && !props.errorAmount)} actionCancel={() => {setStep(1)}} actionNotOK={() => {errorNextStepTwo()}} actionOK={confirmSale}/>
                </BeShowed>
                
                <BeShowed show={step===3}>
                    <Pay setStep={setStep}/>
                </BeShowed>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        products: state.productsDelivery,
        errorStreetNumber: state.errorStreetNumberDelivery,
        errorNames: state.errorNamesDelivery,
        errorStreet: state.errorStreetDelivery,
        errorCellphone: state.errorCellphoneDelivery,
        errorAmount: state.errorAmountDelivery,
        details: state.detailsDelivery,
        total: state.totalDelivery,
        clients: state.clientsDelivery,
        cellphone: state.cellphoneDelivery,
        names: state.namesDelivery,
        street: state.streetDelivery,
        streetNumber: state.streetNumberDelivery
        }
}

const mapDispatchToProps = {
    updateDeliveryProducts,
    updateDeliveryClients
}

export default connect(mapStateToProps,mapDispatchToProps)(DeliverySales);