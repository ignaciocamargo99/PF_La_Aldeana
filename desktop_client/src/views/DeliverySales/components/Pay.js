import React from 'react';
import BeShowed from '../../../common/BeShowed';
import { connect } from 'react-redux';
import { updateAmountDelivery, updatePayTypeDelivery, updateErrorAmountDelivery } from '../../../actions/DeliverySalesActions';
import Buttons from '../../../common/Buttons';
import errorNextStepThree from '../../../utils/ErrorMessages/errorNextStepThree';
import succesMessageDeliverySale from '../../../utils/SuccessMessages/successMessageDeliverySale';

const Pay = (props) => {
    
    const onChangeAmount = (e) => {
        props.updateErrorAmountDelivery(false)
        props.updateAmountDelivery(e.target.value)
        if(e.target.value < props.total){
            props.updateErrorAmountDelivery(true)
        }
    }

    return(
        <>
            <div className="formRow">
                <h3><b>Pago</b></h3>
                </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label>Tipo de pago* </label>
                </div>
                <div className="form-control-input">
                    <select className="form-control" readOnly>
                        <option selected>{props.payType}</option>
                    </select>
                </div>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label>Monto*</label>
                </div>
                <div className="form-control-input">
                    <input type="number" className="form-control" placeholder="Ingrese el monto con el que abona el cliente..." onChange={(e) => {onChangeAmount(e)}} value={props.amount}></input>
                    <BeShowed show={props.errorAmount}>
                        <b style={{color:'gray'}}>Cantidad entera mayor al total</b>
                    </BeShowed>
                </div>
                </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label><b>Total a pagar: ${props.total}</b></label>
                </div>
            </div>
            <Buttons label='Confirmar' ready={(!props.errorAmount)} actionCancel={() => {props.setStep(2)}} actionNotOK={() => {errorNextStepThree()}} actionOK={() => {succesMessageDeliverySale('Se ha registrado la venta correctamente')}}/>
        </>
    )
}

const mapStateToProps = state => {
    return {
        payType: state.payTypeDelivery,
        amount: state.amountDelivery,
        total: state.totalDelivery,
        errorAmount: state.errorAmountDelivery
    }
}

const mapDispatchToProps = {
    updateAmountDelivery,
    updatePayTypeDelivery,
    updateErrorAmountDelivery
}

export default connect(mapStateToProps, mapDispatchToProps)(Pay);