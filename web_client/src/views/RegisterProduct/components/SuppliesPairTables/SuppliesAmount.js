import React, { useRef, useState } from "react";

export default function SuppliesAmount(props) {

    const inputAmountSupplies = useRef(null);
    const divAmountSuppliesValidation = useRef(null);
    const [isValidClass, setIsValidClass] = useState("form-control");

    const onChangeAmount = () => {
        if (inputAmountSupplies.current.value <= 0) {
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
        <td style={{ textAlign: 'center', padding:'10px 70px 10px 75px '}}>
            <input className={isValidClass} id="suppliesAmount" type="number" min="1" ref={inputAmountSupplies} onChange={onChangeAmount} placeholder="0" />
            <div style={{ color: 'red' }} ref={divAmountSuppliesValidation} />
        </td>
    );
}