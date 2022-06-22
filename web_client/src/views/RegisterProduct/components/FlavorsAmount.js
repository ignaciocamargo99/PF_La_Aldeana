import React, { useRef } from "react";
import BeShowed from "common/BeShowed";
import validateFloatNumbers from 'utils/Validations/validateFloatNumbers';

export default function FlavorsAmount(props) {
    const inputFlavorAmount = useRef(null);

    const validate = (e) => {
        if (e.target.value.length > 2) e.target.value = e.target.value.slice(0, 2);
    }

    const onChange = () => {
        let data = props.data;
        if (inputFlavorAmount.current.value > 0) {
            data.flavor = inputFlavorAmount.current.value;
            props.load(data)
        }
        else {
            data.flavor = null;
            props.load(data)
        }
    }

    return (
        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="productName" >Cantidad de sabores</label>
            </div>
            <div className="form-control-input">
                <BeShowed show={!props.data.reading}>
                    <input className="form-control" id="flavorsAmount"
                        type="number" maxLength="80" placeholder="Ingrese cantidad máxima de sabores de helado..."
                        onInput={(e) => validate(e)}
                        onKeyDown={(e) => validateFloatNumbers(e)}
                        onChange={onChange}
                        min="0"
                        ref={inputFlavorAmount} defaultValue={props.data.flavor} />
                </BeShowed>
                <BeShowed show={props.data.reading}>
                    <input className="form-control" id="flavorsAmount" readOnly
                        type="number" maxLength="80" min="0"
                        ref={inputFlavorAmount} defaultValue={props.data.flavor} />
                </BeShowed>

            </div>
        </div>
    );
}