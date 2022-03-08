import React, { useRef, useState } from "react";
import BeShowed from "../../../../common/BeShowed";
import validateFloatNumbers from '../../../../utils/Validations/validateFloatNumbers';

export default function DniManager(props) {

    const inputDni = useRef(null);
    const [isValidClass, setIsValidClass] = useState("form-control");

    const onChangeDni = () => {
        if (inputDni.current.value > 10000000 && inputDni.current.value.length === 8) {
            setIsValidClass("form-control is-valid");
            let data = props.data;
            let int = Math.trunc(inputDni.current.value);
            data.dni_manager = int;
            props.load(data);
        }
        else {
            setIsValidClass("form-control is-invalid");
            let data = props.data;
            data.dni_manager = 0;
            props.load(data);
        }
    };

    const validate = (e) => {
        if (e.target.value.length > 8) e.target.value = e.target.value.slice(0, 8);
    }

    return (
        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="dni" >DNI*</label>
            </div>
            <BeShowed show={!props.data.reading}>
                <div className="form-control-input">
                    <input className={isValidClass} id="dni" onInput={(e) => validate(e)} type="number" min="10000000" max="99999999" ref={inputDni} onChange={onChangeDni}
                        placeholder="Ingrese DNI del encargado..." onKeyDown={(e) => validateFloatNumbers(e)} defaultValue={props.data.dni_manager} />
                </div>
            </BeShowed>
            <BeShowed show={props.data.reading}>
                <div className="form-control-input">
                    <input className={isValidClass} id="dni" type="number" min="10000000" max="99999999" defaultValue={props.data.dni_manager} readOnly />
                </div>
            </BeShowed>

        </div>
    );
}