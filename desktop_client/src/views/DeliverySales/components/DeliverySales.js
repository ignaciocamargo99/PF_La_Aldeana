import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import DateFormat from '../../../utils/DateFormat/dateFormat';
import BeShowed from '../../../common/BeShowed';
import Pay from './Pay';
import Client from './Client';
import Products from './Products';
import { updateErrorStreetNumberDelivery, updateStreetNumberDelivery, updateErrorStreetDelivery, updateStreetDelivery, updateErrorNamesDelivery, 
    updateNamesDelivery, updateErrorCellphoneDelivery, updateCellphoneDelivery, updateErrorAmountDelivery, updateAmountDelivery,resetDetailDelivery,
    updateDeliveryClients, updateDeliveryProductsQuantities,subtractTotalDelivery, updateDeliveryProductsNotStock } from '../../../actions/DeliverySalesActions';
import Buttons from '../../../common/Buttons';
import errorNextStepTwo from '../../../utils/ErrorMessages/errorNextStepTwo';
import succesMessageDeliverySale from '../../../utils/SuccessMessages/successMessageDeliverySale';
import dateTimeFormat from '../../../utils/DateFormat/dateTimeFormat'
import warningMessage from '../../../utils/warningMessage';
import '../styles/DeliverySales.css';

const PORT = require('../../../config');

const DeliverySales = (props) => {
    const [step,setStep] = useState(1);
    const [date,setDate] = useState('');

    useEffect(() => {
        let date = DateFormat(new Date());
        setDate(date);
    },[]);
 
    useEffect(() => {
        axios.get( PORT() + `/api/clients`)
        .then((response) => {
            props.updateDeliveryClients(response.data);
        })
        .catch((err) => {
            console.log(err);
        })
    },[]);

    useEffect(() => {
        axios.get( PORT() + `/api/productsNotStock`)
        .then((response) => {
            let aux = []
            for(let i = 0 ; i < response.data.length ; i++){
                aux.push(response.data[i].id_product);
            }
            props.updateDeliveryProductsNotStock(aux);
            axios.get( PORT() + `/api/allProducts`)
            .then((response) => {
                let aux = [];
                for(let i = 0 ; i < response.data.length ; i++){
                    aux.push({'product':response.data[i],'quantity':0});
                }
                props.updateDeliveryProductsQuantities(aux);
            })
            .catch((err) => {
                console.log(err);
            })
        })
        .catch((err) => {
            console.log(err);
        })
    },[]);

    const confirmSale = () => {
        let details = [];
        props.details.map((detail,i) => {
            details.push(
                {
                    "id_product": detail.product.id_product,
                    "quantity": detail.quantity,
                    "subtotal": detail.subtotal
                }
            );
        });
        let sale = { date_hour: dateTimeFormat(new Date()), total_amount:props.total, id_pay_type:1, cellphone_client:props.cellphone, details:JSON.stringify(details)}; 
        axios.post(`${PORT()}/api/salesDelivery`, sale)
            .then((sale) => {
                if(sale.data.Ok) {
                    resetStates();
                }
                else warningMessage('Error!!','Ha ocurrido un error al registrar la venta. \n' + sale.data.Message,"error");
            })
            .catch(error => console.log(error))
    }

    const resetStates = () => {
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
        succesMessageDeliverySale('Se ha registrado la venta correctamente'); 
    }

    return(
        <>
            <div className="viewContent">
                <h1 className="display-5">Registrar venta por delivery</h1>
                <hr />
                <div className="formRow" style={{justifyContent:'flex-end'}}>
                    <div className="form-label-no-margin" style={{marginRight:'0%'}}>
                        <label>Fecha:</label>
                    </div>
                    <div className="" style={{width:'200px'}}>
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
        errorStreetNumber: state.errorStreetNumberDelivery, errorNames: state.errorNamesDelivery,
        errorStreet: state.errorStreetDelivery, errorCellphone: state.errorCellphoneDelivery,
        errorAmount: state.errorAmountDelivery, details: state.detailsDelivery,
        total: state.totalDelivery, clients: state.clientsDelivery, cellphone: state.cellphoneDelivery,
        names: state.namesDelivery, street: state.streetDelivery, streetNumber: state.streetNumberDelivery
    }
}

const mapDispatchToProps = {
    updateDeliveryProductsQuantities, updateDeliveryClients, resetDetailDelivery,updateErrorStreetNumberDelivery, 
    updateStreetNumberDelivery, updateErrorStreetDelivery, updateStreetDelivery, updateErrorNamesDelivery, 
    updateNamesDelivery, updateErrorCellphoneDelivery, updateCellphoneDelivery, updateErrorAmountDelivery, 
    updateAmountDelivery,subtractTotalDelivery, updateDeliveryProductsNotStock
}

export default connect(mapStateToProps,mapDispatchToProps)(DeliverySales);