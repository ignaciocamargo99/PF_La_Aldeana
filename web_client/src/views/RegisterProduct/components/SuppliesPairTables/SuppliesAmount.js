import React, { useRef, useState } from "react";

export default function SuppliesAmount (props) {
    
    const inputAmountSupplies = useRef(null);
    const divAmountSuppliesValidation = useRef(null);
    const [isValidClass, setIsValidClass] = useState("form-control");

    const onChangeAmount = () => {
        if (inputAmountSupplies.current.value < 0) {
            setIsValidClass("form-control is-invalid");
            divAmountSuppliesValidation.current.innerHTML = "Ingrese un número mayor a 0";
            props.load("error", props.supply);
        }
        else {
            setIsValidClass("form-control is-valid");
            divAmountSuppliesValidation.current.innerHTML = "";
            props.load(inputAmountSupplies.current.value, props.supply);
        }
    };

    return (
        <div className="formRow">
            <div className="form-control-input">
                <input className={isValidClass} id="suppliesAmount" type="number" min="1" ref={inputAmountSupplies} onChange={onChangeAmount} placeholder="-" />
                <div style={{ color: 'red' }} ref={divAmountSuppliesValidation} />
            </div>
        </div>
    );
}