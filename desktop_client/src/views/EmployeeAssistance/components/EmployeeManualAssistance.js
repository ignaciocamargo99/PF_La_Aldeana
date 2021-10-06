import React, { useEffect, useState, useRef } from "react";
import '../styles/ManualAssistance.css';
import validateFloatNumbers from '../../../utils/Validations/validateFloatNumber';
import Axios from 'axios';
import { updateAssistanceEmployee } from '../../../actions/EmployeeAssistanceActions';
import { connect } from 'react-redux';
import loadingMessage from '../../../utils/LoadingMessages/loadingMessage';
import errorMessage from '../../../utils/ErrorMessages/errorMessage';
import swal from '@sweetalert/with-react'
import dateTimeFormat from '../../../utils/DateFormat/dateTimeFormat';
import egressEmployee from "./egressEmployee";

const PORT = require('../../../config')

function EmployeeManualAssistance(props) {
    const [isValidClass, setIsValidClass] = useState('form-control');
    const [employee, setEmployee] = useState();
    const [assistanceEmployee, setAssistanceEmployee] = useState({ date_entry: null, dniEmployee: null });
    const inputDNI = useRef(null);
    const dateTimeAssistance = dateTimeFormat(new Date());
    const [assistance, setAssistance] = useState();

    useEffect(() => {
        Axios.get(`${PORT()}/api/employees`)
            .then(response => setEmployee(response.data))
            .catch(error => console.error(error));
    }, []);


    const validate = (e) => {
        if (e.target.value.length > 8) e.target.value = e.target.value.slice(0, 8);
    }

    const onChangeButton = (e) => {
        if (e.target.value.length === 8) setIsValidClass("form-control is-valid");
        else setIsValidClass("form-control");
    }

    const onClickValidation = () => {
        try {
            let searchEmployee;
            searchEmployee = employee.find((employee) => employee.dni === parseInt(inputDNI.current.value, 10));



            // Axios.get(`${PORT()}/api/assistanceEmployee/${searchEmployee.dni}`)
            //     .then(response => setAssistance(response.data))

            // if (assistance) {
            //     console.log(assistance)
            //     egressEmployee(searchEmployee.name);
            // }
            // else {
            if (searchEmployee) {
                loadingMessage('Validando...')
                props.updateAssistanceEmployee(true);
                assistanceEmployee.date_entry = dateTimeAssistance;
                assistanceEmployee.dniEmployee = searchEmployee.dni;
                Axios.post(`${PORT()}/api/assistanceEmployee`, assistanceEmployee)
                    .then((assistanceEmployee) => {
                        if (assistanceEmployee.data.Ok) {
                            assistanceEmployee.date_entry = null;
                            swal(
                                <div>
                                    <h1 style={{ fontWeight: 'bold' }}>Bienvenido {searchEmployee.name}</h1>
                                    <hr />
                                    <h2>¡Que tenga una excelente jornada!</h2>
                                </div>
                            );
                            inputDNI.current.value = "";
                            setIsValidClass('form-control');
                        }
                        else errorMessage('Atención', 'Ha ocurrido un error al marcar su asistencia')
                    })
            }
            else errorMessage('Atención', 'Verifique su DNI ingresado e intente nuevamente')
        }
        // }
        catch (error) {
            console.error(error)
            errorMessage('Atención', 'Ha ocurrido un inconveniente, disculpe las molestias...')
        }
    }

    return (
        <>
            <h2>Marcar asistencia</h2>
            <div className="formRowCenter">
                <div className="form-control-label">
                    <label htmlFor="dni">DNI</label>
                </div>
                <div className="form-control-input">
                    <input className={isValidClass} style={{ textAlign: 'center' }} id="dni" autoFocus type="number" placeholder="Ingrese su dni..."
                        onKeyDown={(e) => validateFloatNumbers(e)}
                        onInput={(e) => validate(e)}
                        onChange={(e) => onChangeButton(e)} ref={inputDNI} />
                </div>
                <button className="btn btn-primary" style={{ marginLeft: '5px' }} onClick={onClickValidation}>Validar</button>
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        employeeAssistance: state.employeeAssistance
    };
};

const mapDispatchToProps = {
    updateAssistanceEmployee
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeManualAssistance);