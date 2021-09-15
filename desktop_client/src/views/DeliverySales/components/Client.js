import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import BeShowed from '../../../common/BeShowed';
import { updateDeliveryClient ,updateCellphoneDelivery, updateErrorCellphoneDelivery, updateNamesDelivery, updateErrorNamesDelivery,
        updateStreetDelivery, updateErrorStreetDelivery, updateStreetNumberDelivery, updateErrorStreetNumberDelivery} from '../../../actions/DeliverySalesActions';
import { validateInput } from '../../../utils/ValidationsInputs/ValidateInputs';
import validateFloatNumbers from '../../../utils/Validations/validateFloatNumbers';

const PORT = require('../../../config');

const Client = (props) => {


    const onChangeCellphone = (e) => {
        props.updateErrorCellphoneDelivery(false)
        if(e.target.value.length > e.target.maxLength){
            e.target.value = e.target.value.slice(0,e.target.maxLength)
        }
        props.updateCellphoneDelivery(e.target.value)
        if(!validateInput(e.target.value.trim(),10,10)){
            props.updateErrorCellphoneDelivery(true)
        }
        if(e.target.value.length === 10){
            axios.get( `${PORT()}/api/clients/${e.target.value}`)
            .then((response) => {
                if(response.data.length !== 0){
                    props.updateDeliveryClient(response.data[0])
                    props.updateErrorNamesDelivery(false)
                    props.updateNamesDelivery(response.data[0].names)
                    props.updateErrorStreetDelivery(false)
                    props.updateStreetDelivery(response.data[0].street_name)
                    props.updateErrorStreetNumberDelivery(false)
                    props.updateStreetNumberDelivery(response.data[0].street_number)
                }
                else{
                    props.updateDeliveryClient(null)
                }
            })
        }
    }

    const onChangeNames = (e) => {
        props.updateErrorNamesDelivery(false)
        props.updateNamesDelivery(e.target.value)
        if(!validateInput(e.target.value.trim(),1,50)){
            props.updateErrorNamesDelivery(true)
        }
    }

    const onChangeStreet = (e) => {
        props.updateErrorStreetDelivery(false)
        props.updateStreetDelivery(e.target.value)
        if(!validateInput(e.target.value.trim(),1,25)){
            props.updateErrorStreetDelivery(true)
        }
    }

    const onChangeStreetNumber = (e) => {
        props.updateErrorStreetNumberDelivery(false)
        if(e.target.value.length > e.target.maxLength){
            e.target.value = e.target.value.slice(0,e.target.maxLength)
        }
        props.updateStreetNumberDelivery(e.target.value)
        if(!validateInput(e.target.value.trim(),1,4) || e.target.value <= 0){
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
                    <input type="number" className={props.errorCellphone?"form-control":"form-control is-valid"} min="0" max="9999999999" maxLength="10" onChange={(e) => {onChangeCellphone(e)}} onKeyDown={(e) => {validateFloatNumbers(e)}} placeholder="Ingrese el celular del cliente..." value={props.cellphone}></input>
                    <BeShowed show={props.errorCellphone}>
                        <label><b style={{color:'gray'}}>Número de 10 digitos</b></label>
                    </BeShowed>
                </div>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label>Nombre y Apellido*</label>
                </div>
                <div className="form-control-input">
                    <input  type="text" className={props.errorNames?"form-control":"form-control is-valid"} minLength="0" maxLength="50" onChange={(e) => onChangeNames(e)} placeholder="Ingrese el nombre completo del cliente..." value={props.names}></input>
                    <BeShowed show={props.errorNames}>
                        <label><b style={{color:'gray'}}>Texto de 1 a 50 caractéres</b></label>
                    </BeShowed>
                </div>
            </div>
            <div className="formRow">
                <div className="form-label-no-margin col-sm-1">
                    <label>Calle*</label>
                </div>
                <div className="form-input col-sm-6">
                    <input type="text" className={props.errorStreet?"form-control":"form-control is-valid"} min="0" maxLength="25" onChange={(e) => {onChangeStreet(e)}} placeholder="Ingrese el la calle..." value={props.street}></input>
                    <BeShowed show={props.errorStreet}>
                        <label><b style={{color:'gray'}}>Texto de 1 a 25 caractéres</b></label>
                    </BeShowed>
                </div>
                <div className="form-label-no-margin offset-sm-1 col-sm-1">
                    <label>Numero*</label>
                </div>
                <div className="form-input col-sm-3">
                   <input type="number" className={props.errorStreetNumber?"form-control":"form-control is-valid"} min="1" max="9999" maxLength="4" onChange={(e) => {onChangeStreetNumber(e)}} onKeyDown={(e) => {validateFloatNumbers(e)}} placeholder="Ingrese el nro..." value={props.streetNumber}></input>
                    <BeShowed show={props.errorStreetNumber}>
                        <label><b style={{color:'gray'}}>Número de 1 a 4 digitos</b></label>
                    </BeShowed>
                </div>
            </div>
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
    updateDeliveryClient
}

export default connect(mapStateToProps, mapDispatchToProps)(Client);