import React, {useEffect, useState} from "react";
import '../styles/ManualAssistance.css';
import validateFloatNumbers from '../../../utils/Validations/validateFloatNumber';

export default function EmployeeManualAssistance() {

    const [isValidClass, setIsValidClass] = useState('form-control')

    const validate = (e) => {
        if (e.target.value.length > 8) e.target.value = e.target.value.slice(0, 8);
    }

    const onChangeButton = (e) => {
        if(e.target.value.length === 8) setIsValidClass("form-control is-valid");
        else setIsValidClass("form-control");
    }

    

    return (
        <>
            <h2>Registro manual de asistencia</h2>
            <div className="formRowCenter">
                <div className="form-control-label">
                    <label htmlFor="dni">DNI</label>
                </div>
                <div className="form-control-input">
                    <input className={isValidClass} style={{ textAlign: 'center'}} id="dni" autoFocus type="number" placeholder="Ingrese su dni..."
                        onKeyDown={(e) => validateFloatNumbers(e)} onInput={(e) => validate(e)} onChange={(e) => onChangeButton(e)} />
                </div>
                <button className="btn btn-primary" style={{marginLeft: '5px'}}>Validar</button>
            </div>
        </>
    );
}