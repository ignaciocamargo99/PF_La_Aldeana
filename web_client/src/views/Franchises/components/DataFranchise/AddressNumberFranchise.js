import React, { useRef, useState } from "react";
import BeShowed from "../../../../common/BeShowed";
import validateFloatNumbers from '../../../../utils/Validations/validateFloatNumbers';

export default function AddressNumberFranchise(props) {

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

    const validate = (e) => {
        if (e.target.value.length > 5) e.target.value = e.target.value.slice(0, 5);
    }

    return (
        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="address_number" >Número de calle*</label>
            </div>
            <BeShowed show={!props.data.reading}>
                <div className="form-control-input">
                    <input className={isValidClass} id="address_number" onInput={(e) => validate(e)} type="number" min="0" max="99999" ref={inputNumber} onChange={onChangeNumber}
                        placeholder="Ingrese número de calle..." onKeyDown={(e) => validateFloatNumbers(e)} />
                </div>
            </BeShowed>
            <BeShowed show={props.data.reading}>
                <div className="form-control-input">
                    <input className={isValidClass} id="address_number" onInput={(e) => validate(e)} type="number" min="0" max="99999" defaultValue={props.data.address_number} readOnly />
                </div>
            </BeShowed>

        </div>
    );
}