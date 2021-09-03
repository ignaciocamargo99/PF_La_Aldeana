import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import DateFormat from '../../../utils/DateFormat/dateFormat';
import BeShowed from '../../../common/BeShowed';
import Pay from './Pay';
import Client from './Client';
import Products from './Products';
import { updateDeliveryDate,updateDeliveryProducts } from '../../../actions/DeliverySalesActions';
import Buttons from '../../../common/Buttons';
import errorNextStepTwo from '../../../utils/ErrorMessages/errorNextStepTwo';
import succesMessageDeliverySale from '../../../utils/SuccessMessages/successMessageDeliverySale';

const PORT = require('../../../config');

const DeliverySales = (props) => {
    const [step,setStep] = useState(1);

    useEffect(() => {
        let date = DateFormat(new Date())
        props.updateDeliveryDate(date)   
        axios.get( PORT() + `/api/allProducts`)
        .then((response) => {
            props.updateDeliveryProducts(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

    const confirmSale = () => {
        let sale_number = null
        let date = new Date()
        let total_amount = props.total
        let typePay = 1
        
        let details = []
        props.details.map((detail,i) => {
            details.push(
                {
                    "sale_number": sale_number,
                    "detail_number": i,
                    "id_product": detail.product.id_product,
                    "quantity": detail.quantity,
                    "subtotal": detail.subtotal
                }
            )
        })

        let cellphone_number = props.cellphone
        let names = props.names


        let sale = {sale_number,date,total_amount,typePay,cellphone_number,details}
        console.log(sale)

        let client = {cellphone_number,names}
        console.log(client)

        let street = props.street
        let street_number = props.streetNumber

        let address = {street,street_number,cellphone_number}
        console.log(address)
        succesMessageDeliverySale('Se ha registrado la venta correctamente')
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
                        <input type="date" className="form-control" value={props.date} readOnly></input>
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
        errorStreetNumber: state.errorStreetNumberDelivery,
        errorNames: state.errorNamesDelivery,
        errorStreet: state.errorStreetDelivery,
        errorCellphone: state.errorCellphoneDelivery,
        errorAmount: state.errorAmountDelivery,
        details: state.detailsDelivery,
        total: state.totalDelivery,
        date: state.dateDelivery,
        cellphone: state.cellphoneDelivery,
        names: state.namesDelivery,
        street: state.streetDelivery,
        streetNumber: state.streetNumberDelivery
        }
}

const mapDispatchToProps = {
    updateDeliveryProducts,
    updateDeliveryDate
}

export default connect(mapStateToProps,mapDispatchToProps)(DeliverySales);