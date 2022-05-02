import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from "react";
import validateFloatNumbers from "../../../../utils/validateFloatNumbers";
import warningCountProduct from '../../../../utils/WarningMessages/warningCountProduct';

const SuppliesAmount = ({ supply, addAmountOfSupply }) => {

    const inputAmountSupplies = useRef(null);
    const divAmountSuppliesValidation = useRef(null);

    let validAmount = false;

    const onChangeAmount = () => checkValue();

    const checkValue = () => {
        const amount = inputAmountSupplies.current.value;

        if (amount < 0 && amount.length <= 2) {
            setInvalidStatus("Ingrese un número mayor a 0");
        }
        else if (amount.length > 2) {
            setInvalidStatus("Hasta 2 cifras como máximo");
        }
        else {
            setValidStatus();
        }
    };

    const setInvalidStatus = (message) => {
        divAmountSuppliesValidation.current.innerHTML = message;
        validAmount = false;
    };

    const setValidStatus = () => {
        divAmountSuppliesValidation.current.innerHTML = '';
        validAmount = true;
    };

    const addButtonClicked = () => {
        checkValue();

        if (validAmount) {
            addAmountOfSupply(supply, inputAmountSupplies.current.value);
            inputAmountSupplies.current.value = '';
        }
        else {
            return warningCountProduct();
        };
    };

    return (
        <>
            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <input style={{ width: '120px' }} className="form-control-md" id="suppliesAmount" type="number" min="1" ref={inputAmountSupplies}
                    onChange={onChangeAmount} placeholder="0" onKeyDown={(e) => validateFloatNumbers(e)} />
                <div style={{ color: 'red', fontWeight: 'bold' }} ref={divAmountSuppliesValidation} />
            </td>
            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <button className="btnAdd btn btn-info" type="button" onClick={addButtonClicked}><FontAwesomeIcon icon={faPlus} /></button>
            </td>
        </>
    );
};

export default SuppliesAmount;