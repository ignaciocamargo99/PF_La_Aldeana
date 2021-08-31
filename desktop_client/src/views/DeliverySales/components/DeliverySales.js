import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import DateFormat from '../../../utils/DateFormat/dateFormat';
import BeShowed from '../../../common/BeShowed';
import Pay from './Pay';
import Client from './Client';
import Products from './Products';
import { updateDeliveryProducts } from '../../../actions/DeliverySalesActions';

const PORT = require('../../../config');

const DeliverySales = (props) => {
    const [step,setStep] = useState(1);
    const inputDate = useRef(null);

    useEffect(() => {
        let date = DateFormat(new Date());
        inputDate.current.value = date;
        axios.get( PORT() + `/api/allProducts`)
        .then((response) => {
            props.updateDeliveryProducts(response.data)
            let aux = []
            response.data.map(() => {
                aux.push('')
            })
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

    return(
        <>
            <div className="viewContent">
                <h1 className="display-5">Registrar venta por delivery</h1>
                <hr />
                <div className="formRow" style={{justifyContent:'flex-end'}}>
                    <div className="form-control-label col-sm-1">
                        <label>Fecha</label>
                    </div>
                    <div className="form-control-input col-sm-2" style={{width:'200px'}}>
                        <input type="date" className="form-control" ref={inputDate} readOnly></input>
                    </div>
                </div>

                <BeShowed show={step===1}>
                    <Products setStep={setStep}/>
                </BeShowed>
                
                <BeShowed show={step===2}>
                    <Client setStep={setStep}/>
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
    }
}

const mapDispatchToProps = {
    updateDeliveryProducts,
}

export default connect(mapStateToProps,mapDispatchToProps)(DeliverySales);