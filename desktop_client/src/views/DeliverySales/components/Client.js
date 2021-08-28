import React from 'react';
import { connect } from 'react-redux';
import BeShowed from '../../../common/BeShowed';
import { updateCellphoneDelivery, updateErrorCellphoneDelivery, updateNamesDelivery, updateErrorNamesDelivery,
        updateStreetDelivery, updateErrorStreetDelivery, updateStreetNumberDelivery, updateErrorStreetNumberDelivery} from '../../../actions/DeliverySalesActions';
import { validateInput } from '../../../utils/ValidationsInputs/ValidateInputs';
import Buttons from '../../../common/Buttons';
import errorNextStepTwo from '../../../utils/ErrorMessages/errorNextStepTwo';

const Client = (props) => {

    const onChangeCellphone = (e) => {
        props.updateErrorCellphoneDelivery(false)
        if(e.target.value.length > e.target.maxLength){
            e.target.value = e.target.value.slice(0,e.target.maxLength)
        }
        props.updateCellphoneDelivery(e.target.value)
        if(!validateInput(e.target.value,10,10)){
            props.updateErrorCellphoneDelivery(true)
        } 
    }

    const onChangeNames = (e) => {
        props.updateErrorNamesDelivery(false)
        props.updateNamesDelivery(e.target.value)
        if(!validateInput(e.target.value,1,50)){
            props.updateErrorNamesDelivery(true)
        }
    }

    const onChangeStreet = (e) => {
        props.updateErrorStreetDelivery(false)
        props.updateStreetDelivery(e.target.value)
        if(!validateInput(e.target.value,1,25)){
            props.updateErrorStreetDelivery(true)
        }
    }

    const onChangeStreetNumber = (e) => {
        props.updateErrorStreetNumberDelivery(false)
        if(e.target.value.length > e.target.maxLength){
            e.target.value = e.target.value.slice(0,e.target.maxLength)
        }
        props.updateStreetNumberDelivery(e.target.value)
        if(!validateInput(e.target.value,1,4)){
            props.updateErrorStreetNumberDelivery(true)
        }
    }

    return(
        <>
            <div className="formRow">
                <h3><b>Cliente</b></h3>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label>Numero de celular*</label>
                </div>
                <div className="form-control-input">
                    <input type="number" className="form-control" maxLength="10" onChange={(e) => {onChangeCellphone(e)}} placeholder="Ingrese el celular del cliente..." value={props.cellphone}></input>
                    <BeShowed show={props.errorCellphone}>
                        <b style={{color:'gray'}}>Número de 10 digitos</b>
                    </BeShowed>
                </div>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label>Nombre y Apellido*</label>
                </div>
                <div className="form-control-input">
                    <input  type="text" className="form-control" maxLength="50" onChange={(e) => onChangeNames(e)} placeholder="Ingrese el nombre completo del cliente..." value={props.names}></input>
                    <BeShowed show={props.errorNames}>
                        <b style={{color:'gray'}}>Texto de 1 a 50 caractéres</b>
                    </BeShowed>
                </div>
            </div>
            <div className="formRow">
                <div className="form-control-label col-sm-2">
                    <label>Calle*</label>
                </div>
                <div className="form-control-input col-sm-5">
                    <input type="text" className="form-control" maxLength="25" onChange={(e) => {onChangeStreet(e)}} placeholder="Ingrese el la calle..." value={props.street}></input>
                    <BeShowed show={props.errorStreet}>
                        <b style={{color:'gray'}}>Texto de 1 a 25 caractéres</b>
                    </BeShowed>
                </div>
                <div className="form-control-label offset-sm-1 col-sm-1">
                    <label>Numero*</label>
                </div>
                <div className="form-control-input col-sm-3">
                   <input type="number" className="form-control" maxLength="4" onChange={(e) => {onChangeStreetNumber(e)}} placeholder="Ingrese el nro..." value={props.streetNumber}></input>
                    <BeShowed show={props.errorStreetNumber}>
                        <b style={{color:'gray'}}>Número de 1 a 4 digitos</b>
                    </BeShowed>
                </div>
            </div>
            <Buttons label='Siguiente' ready={(!props.errorCellphone && !props.errorNames && !props.errorStreet && !props.errorStreetNumber)} actionCancel={() => {props.setStep(1)}} actionNotOK={() => {errorNextStepTwo()}} actionOK={() => {props.setStep(3)}}/>
        </>
    )
}

const mapStateToProps = state => {
    return {
        cellphone: state.cellphoneDelivery,
        errorCellphone: state.errorCellphoneDelivery,
        names: state.namesDelivery,
        errorNames: state.errorNamesDelivery,
        street: state.streetDelivery,
        errorStreet: state.errorStreetDelivery,
        streetNumber: state.streetNumberDelivery,
        errorStreetNumber: state.errorStreetNumberDelivery,
    }
}

const mapDispatchToProps = {
    updateCellphoneDelivery,
    updateErrorCellphoneDelivery,
    updateNamesDelivery,
    updateErrorNamesDelivery,
    updateStreetDelivery,
    updateErrorStreetDelivery,
    updateStreetNumberDelivery,
    updateErrorStreetNumberDelivery,
}

export default connect(mapStateToProps, mapDispatchToProps)(Client);