import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from "react";
import validateFloatNumbers from "../../../utils/Validations/validateFloatNumbers";
import warningMessage from '../../../utils/WarningMessages/warningMessage';

export default function FlavorsAmount({ flavor, addAmountOfFlavor }) {

    const inputAmountFlavors = useRef(null);
    const divAmountFlavorsValidation = useRef(null);
    let validAmount = false;

    const onChangeAmount = () => checkValue();

    const checkValue = () => {
        const amount = inputAmountFlavors.current.value;

        if (amount <= 0) {
            setInvalidStatus("Ingrese un número mayor a 0");
        }
        else if (amount >= 100) {
            setInvalidStatus("Ingrese un número menor a 100");
        }
        else {
            setValidStatus();
        }
    };

    const setInvalidStatus = (message) => {
        divAmountFlavorsValidation.current.innerHTML = message;
        validAmount = false;
    };

    const setValidStatus = () => {
        divAmountFlavorsValidation.current.innerHTML = '';
        validAmount = true;
    };

    const addButtonClicked = () => {
        checkValue();

        if (validAmount) {
            addAmountOfFlavor(flavor, inputAmountFlavors.current.value);
            inputAmountFlavors.current.value = '';
        }
        else {
            warningMessage("Atención", "Se debe ingresar una cantidad válida para el sabor.", "info");
        };
    };

    return (
        <>
            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <input style={{ width: '120px' }} className="form-control-md" type="number" min="1" ref={inputAmountFlavors}
                    onChange={onChangeAmount} placeholder="0" onKeyDown={(e) => validateFloatNumbers(e)} />
                <div style={{ color: 'red', fontWeight: 'bold' }} ref={divAmountFlavorsValidation} />
            </td>
            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <button className="btn-sm px-3" type="button" style={{ backgroundColor: '#A5DEF9', borderColor: '#A5DEF9' }}
                    onClick={addButtonClicked}><FontAwesomeIcon icon={faPlus}
                    />
                </button>
            </td>
        </>
    );
}

