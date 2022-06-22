import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import BeShowed from '../../../common/BeShowed';
import {
    updateDeliveryClient, updateCellphoneDelivery, updateErrorCellphoneDelivery, updateNamesDelivery, updateErrorNamesDelivery,
    updateStreetDelivery, updateErrorStreetDelivery, updateStreetNumberDelivery, updateErrorStreetNumberDelivery
} from '../../../actions/DeliverySalesActions';
import { validateInput } from '../../../utils/ValidationsInputs/ValidateInputs';
import validateFloatNumbers from '../../../utils/Validations/validateFloatNumbers';
import loadingMessage from '../../../utils/LoadingMessages/loadingMessage';
import swal from 'sweetalert';

const PORT = require('../../../config');

const Client = (props) => {

    const onChangeCellphone = (e) => {
        let get = true;
        props.updateErrorCellphoneDelivery(false)
        if (e.target.value.length > e.target.maxLength) {
            get = false
            e.target.value = e.target.value.slice(0, e.target.maxLength)
        }
        props.updateCellphoneDelivery(e.target.value);
        if (!validateInput(e.target.value.trim(), 10, 10)) {
            props.updateErrorCellphoneDelivery(true)
            get = false
        }
        if (e.target.value.length === 10 && get) {
            loadingMessage('Cargando cliente')
            axios.get(`${PORT()}/api/clients/${e.target.value}`)
                .then((response) => {
                    if (response.data.length !== 0) {
                        const { observation, ...client } = response.data[0];
                        resetStates(client, false);
                        props.setClientObservation(observation);
                        swal.close()
                    }
                    else {
                        props.updateDeliveryClient({ cellphone: e.target.value, names: '', street_name: '', street_number: '' })
                        props.setClientObservation('');
                        swal.close()
                    }
                })
        }
        else if (e.target.value.length < 10 && !get) {
            props.updateDeliveryClient({ cellphone: e.target.value, names: '', street_name: '', street_number: '' })
            resetStates({ cellphone: e.target.value, names: '', street_name: '', street_number: '' }, true)
            // swal.close() 
        }
    }

    const resetStates = (client, bool) => {
        props.updateDeliveryClient(client)
        props.updateErrorNamesDelivery(bool)
        props.updateNamesDelivery(client.names)
        props.updateErrorStreetDelivery(bool)
        props.updateStreetDelivery(client.street_name)
        props.updateErrorStreetNumberDelivery(bool)
        props.updateStreetNumberDelivery(client.street_number)
    }

    const onChangeNames = (e) => {
        props.updateErrorNamesDelivery(false);
        props.updateNamesDelivery(e.target.value);
        if (!validateInput(e.target.value.trim(), 1, 50)) {
            props.updateErrorNamesDelivery(true);
        }
    }

    const onChangeStreet = (e) => {
        props.updateErrorStreetDelivery(false);
        props.updateStreetDelivery(e.target.value);
        if (!validateInput(e.target.value.trim(), 1, 25)) {
            props.updateErrorStreetDelivery(true);
        }
    }

    const onChangeStreetNumber = (e) => {
        props.updateErrorStreetNumberDelivery(false);
        if (e.target.value.length > e.target.maxLength) {
            e.target.value = e.target.value.slice(0, e.target.maxLength);
        }
        props.updateStreetNumberDelivery(e.target.value);
        if (!validateInput(e.target.value.trim(), 1, 4) || e.target.value <= 0) {
            props.updateErrorStreetNumberDelivery(true);
        }
    }

    return (
        <>
            <div className="formRow">
                <h3><b>Cliente</b></h3>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label>Número de celular*</label>
                </div>
                <div className="form-control-input">
                    <input type="number" className={props.errorCellphone ? "form-control" : "form-control is-valid"} min="0" max="9999999999" maxLength="10" onChange={(e) => { onChangeCellphone(e) }} onKeyDown={(e) => { validateFloatNumbers(e) }} placeholder="Ingrese el celular del cliente..." value={props.cellphone}></input>
                    <BeShowed show={props.errorCellphone}>
                        <small className="text-muted">Número de 10 digitos</small>
                    </BeShowed>
                </div>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label>Nombre y Apellido*</label>
                </div>
                <div className="form-control-input">
                    <input type="text" className={(props.errorNames) ? "form-control" : "form-control is-valid"} minLength="0" maxLength="50" onChange={(e) => onChangeNames(e)} placeholder="Ingrese el nombre completo del cliente..." value={props.names}></input>
                    <BeShowed show={props.errorNames}>
                        <small className="text-muted">Texto de 1 a 50 caractéres</small>
                    </BeShowed>
                </div>
            </div>
            <div className="formRow">
                <div className="form-label-no-margin col-sm-1">
                    <label>Calle*</label>
                </div>
                <div className="form-input col-sm-6">
                    <input type="text" className={props.errorStreet ? "form-control" : "form-control is-valid"} min="0" maxLength="25" onChange={(e) => { onChangeStreet(e) }} placeholder="Ingrese el la calle..." value={props.street}></input>
                    <BeShowed show={props.errorStreet}>
                        <small className="text-muted">Texto de 1 a 25 caractéres</small>
                    </BeShowed>
                </div>
                <div className="form-label-no-margin offset-sm-1 col-sm-1">
                    <label>Número*</label>
                </div>
                <div className="form-input col-sm-3">
                    <input type="number" className={props.errorStreetNumber ? "form-control" : "form-control is-valid"} min="1" max="9999" maxLength="4" onChange={(e) => { onChangeStreetNumber(e) }} onKeyDown={(e) => { validateFloatNumbers(e) }} placeholder="Ingrese el nro..." value={props.streetNumber}></input>
                    <BeShowed show={props.errorStreetNumber}>
                        <small className="text-muted">Número de 1 a 4 digitos</small>
                    </BeShowed>
                </div>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label>Observación</label>
                </div>
                <div className="form-control-input">
                    <textarea type="text" className={"form-control"} minLength="0" maxLength="250" onChange={(e) => { props.setClientObservation(e.target.value) }} placeholder="Ingrese una observación..." value={props.clientObservation} />
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