import React, { useRef } from "react";

export default function SuppliesAmount(props) {

    const inputAmountSupplies = useRef(null);
    const divAmountSuppliesValidation = useRef(null);

    const onChangeAmount = () => {
        if (inputAmountSupplies.current.value < 0) {
            divAmountSuppliesValidation.current.innerHTML = "Ingrese un número mayor a 0";
            props.load("error", props.supply);
        }
        else {
            divAmountSuppliesValidation.current.innerHTML = "";
            props.load(inputAmountSupplies.current.value, props.supply);
        }
    };

    return (
        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
            <input style={{ width: '120px' }} className="form-control-md" id="suppliesAmount" type="number" min="1" ref={inputAmountSupplies} onChange={onChangeAmount} placeholder="0" />
            <div style={{ color: 'red', fontWeight: 'bold' }} ref={divAmountSuppliesValidation} />
        </td>
    );
}