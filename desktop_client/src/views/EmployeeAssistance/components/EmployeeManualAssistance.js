import React, { useEffect, useState, useRef } from "react";
import '../styles/ManualAssistance.css';
import validateFloatNumbers from '../../../utils/Validations/validateFloatNumber';
import Axios from 'axios';

const PORT = require('../../../config')

export default function EmployeeManualAssistance() {
    const [isValidClass, setIsValidClass] = useState('form-control');
    const [employee, setEmployee] = useState();
    const [validEmployee, setValidEmployee] = useState(false);
    const inputDNI = useRef(null);

    useEffect(() => {
        Axios.get(`${PORT()}/api/employees`)
            .then(response => setEmployee(response.data))
            .catch(error => console.error(error))
    }, [])

    const validate = (e) => {
        if (e.target.value.length > 8) e.target.value = e.target.value.slice(0, 8);
    }

    const onChangeButton = (e) => {
        if (e.target.value.length === 8) setIsValidClass("form-control is-valid");
        else setIsValidClass("form-control");
    }

    const onClickValidation = () => {
        let searchDNI;
        searchDNI = employee.find((employee) => employee.dni === parseInt(inputDNI.current.value, 10));
        console.log(searchDNI);
        if (searchDNI) setValidEmployee((validEmployee) => {
            return validEmployee = true
        });
        else setValidEmployee(false);
        console.log(validEmployee)
    }

    return (
        <>
            <h2>Registro manual de asistencia</h2>
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