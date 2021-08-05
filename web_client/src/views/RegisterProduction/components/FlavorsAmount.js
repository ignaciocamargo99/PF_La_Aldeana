import React, { useRef, useState } from "react";

export default function FlavorsAmount (props) {
    
    const inputAmountFlavors = useRef(null);
    const divAmountFlavorsValidation = useRef(null);
    
    const onChangeAmount = () => {
        if (inputAmountFlavors.current.value <= 0) {
            divAmountFlavorsValidation.current.innerHTML = "Ingrese un número mayor a 0";
            props.load(inputAmountFlavors.current.value, props.flavor);
        }
        else if (inputAmountFlavors.current.value > 0 && inputAmountFlavors.current.value <= 100) {
            divAmountFlavorsValidation.current.innerHTML = "";
            props.load(inputAmountFlavors.current.value, props.flavor);
        }
        else {
            divAmountFlavorsValidation.current.innerHTML = "Ingrese un número menor a 100";
            props.load(inputAmountFlavors.current.value, props.flavor);
        }
    };

    return (
        <div style={{ textAlign: 'center', verticalAlign: 'middle' }}>
            <input style={{ width: '150px'}} className="form-control-md" id="flavorsAmount" type="number" min="1" ref={inputAmountFlavors} onChange={onChangeAmount} placeholder="0" />
            <div style={{ color: 'red', fontWeight: 'bold' }} ref={divAmountFlavorsValidation} />
        </div>
    );
}

