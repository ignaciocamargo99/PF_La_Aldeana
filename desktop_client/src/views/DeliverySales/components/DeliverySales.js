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
    updateDeliveryProductsQuantities,subtractTotalDelivery, updateDeliveryProductsStocks } from '../../../actions/DeliverySalesActions';
import Buttons from '../../../common/Buttons';
import errorNextStepTwo from '../../../utils/ErrorMessages/errorNextStepTwo';
import succesMessageDeliverySale from '../../../utils/SuccessMessages/successMessageDeliverySale';
import dateTimeFormat from '../../../utils/DateFormat/dateTimeFormat'
import warningMessage from '../../../utils/warningMessage';
import loadingMessage from '../../../utils/LoadingMessages/loadingMessage';
import '../styles/DeliverySales.css';

const PORT = require('../../../config');

const DeliverySales = (props) => {
    const [step,setStep] = useState(1);
    const [date,setDate] = useState('');
    const [reset,setReset] = useState(false);

    useEffect(() => {
        let date = DateFormat(new Date())
        setDate(date)   
    },[])

    useEffect(() => {
        axios.get( PORT() + `/api/productsStocks`)
        .then((response) => {
            let auxStockProducts = []
            auxStockProducts.push({'id_product': response.data[0].id_product ,'stock': response.data[0].stock <= 0?0: parseInt(response.data[0].stock / response.data[0].quantity)})
            for(let i = 1 ; i < response.data.length ; i++){
                if(response.data[i-1].id_product !== response.data[i].id_product){
                    auxStockProducts.push({'id_product': response.data[i].id_product ,'stock': response.data[i].stock <= 0?0: parseInt(response.data[i].stock / response.data[i].quantity)})
                }
                else{
                    if(auxStockProducts[auxStockProducts.length-1].stock > parseInt(response.data[i].stock / response.data[i].quantity)){
                        auxStockProducts[auxStockProducts.length-1].stock = parseInt(response.data[i].stock / response.data[i].quantity)
                    } 
                }
            }
            props.updateDeliveryProductsStocks(auxStockProducts);
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
    },[reset]);

    const confirmSale = () => {
        loadingMessage('Procesando la venta')
        if(props.client.names === ''){
            axios.post(`${PORT()}/api/clients`, {"cellphone":props.cellphone,"names":props.names,"street_name":props.street,"street_number":props.streetNumber})
        }
        else{
            if(props.client.street_name !== props.street || props.client.street_number !== props.streetNumber){
                axios.put(`${PORT()}/api/clients/${props.client.cellphone}`,{"street_name":props.street,"street_number":props.streetNumber})
            }
        }
        let details = []
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
                    resetStates(false);
                }
                else warningMessage('Error!!','Ha ocurrido un error al registrar la venta. \n' + sale.data.Message,"error");
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
        if(!cancel){
            succesMessageDeliverySale('Se ha registrado la venta correctamente'); 
        }
        props.updateDeliveryProductsQuantities([])
        setReset(!reset)
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
                    <Products setStep={setStep} resetStates={resetStates}/>
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
        total: state.totalDelivery, cellphone: state.cellphoneDelivery, client: state.clientDelivery,
        names: state.namesDelivery, street: state.streetDelivery, streetNumber: state.streetNumberDelivery
    }
}

const mapDispatchToProps = {
    updateDeliveryProductsQuantities, resetDetailDelivery,updateErrorStreetNumberDelivery, 
    updateStreetNumberDelivery, updateErrorStreetDelivery, updateStreetDelivery, updateErrorNamesDelivery, 
    updateNamesDelivery, updateErrorCellphoneDelivery, updateCellphoneDelivery, updateErrorAmountDelivery, 
    updateAmountDelivery,subtractTotalDelivery, updateDeliveryProductsStocks
}

export default connect(mapStateToProps,mapDispatchToProps)(DeliverySales);