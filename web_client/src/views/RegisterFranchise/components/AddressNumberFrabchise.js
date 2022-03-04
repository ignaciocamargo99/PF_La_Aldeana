import React, { useRef, useState } from "react";
import validateFloatNumbers from '../../../utils/Validations/validateFloatNumbers';

export default function AddressNumberFrabchise (props) {
    
    const inputNumber = useRef(null);
    const [isValidClass, setIsValidClass] = useState("form-control");

    const onChangeNumber = () => {
        if (inputNumber.current.value >= 0 && inputNumber.current.value.length <= 5 && inputNumber.current.value.length > 0) {
            setIsValidClass("form-control is-valid");
            let data = props.data;
            let int = Math.trunc(inputNumber.current.value);
            data.address_number = int;
            props.load(data);
        }
        else {
            setIsValidClass("form-control is-invalid");
            let data = props.data;
            data.address_number = -1;
            props.load(data);
        }
    };



    return (
        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="address_number" >Número*</label>
            </div>
            <div className="form-control-input">
                <input className={isValidClass} id="address_number" type="number" min="0" max="99999" ref={inputNumber} onChange={onChangeNumber}
                 placeholder="Ingrese número de calle..." onKeyDown={(e) => validateFloatNumbers(e)}/>
            </div>
        </div>
    );
}