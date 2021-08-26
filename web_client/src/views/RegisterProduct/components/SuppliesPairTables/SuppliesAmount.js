import React, { useRef } from "react";
import validateFloatNumbers from "../../../../utils/validateFloatNumbers";

export default function SuppliesAmount(props) {

    const inputAmountSupplies = useRef(null);
    const divAmountSuppliesValidation = useRef(null);

    const onChangeAmount = () => {
        if (inputAmountSupplies.current.value < 0 && inputAmountSupplies.current.value.length <= 2) {
            divAmountSuppliesValidation.current.innerHTML = "Ingrese un número mayor a 0";
            props.load("error", props.supply);
        }
        else if(inputAmountSupplies.current.value.length > 2){
            divAmountSuppliesValidation.current.innerHTML = "Hasta 2 cifras como máximo"
            props.load("error", props.supply);
        }
        else {
            divAmountSuppliesValidation.current.innerHTML = "";
            props.load(inputAmountSupplies.current.value, props.supply);
        }
    };

    return (
        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
            <input style={{ width: '120px' }} className="form-control-md" id="suppliesAmount" type="number" min="1" ref={inputAmountSupplies} 
            onChange={onChangeAmount} placeholder="0" onKeyDown={(e) => validateFloatNumbers(e)}/>
            <div style={{ color: 'red', fontWeight: 'bold' }} ref={divAmountSuppliesValidation} />
        </td>
    );
}