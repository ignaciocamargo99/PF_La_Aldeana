import React, { useRef } from 'react';
import validateFloatNumbers from '../../../utils/Validations/validateFloatNumber';
import { connect } from 'react-redux';
import { updateFlavorsListDown, updateFlavors, } from '../../../actions/ChamberFlavorsDispatchActions';

const FlavorDispatchAmount = (props) => {
    const inputAmountFlavors = useRef(null);
    const divAmountFlavorsValidation = useRef(null);

    const onChangeAmount = () => {
        if (inputAmountFlavors.current.value < 0 && inputAmountFlavors.current.value.length <= 2) divAmountFlavorsValidation.current.innerHTML = 'Ingrese un número mayor a 0';
        else {
            divAmountFlavorsValidation.current.innerHTML = '';
            props.flavorsDispatch[props.keyElement].amount = inputAmountFlavors.current.value;
        }
    }

    const validate = (e) => {
        if (e.target.value.length > 2) e.target.value = e.target.value.slice(0, 2);
    }

    return (
        <td style={{ textAlign: 'center' }}>
            <input type="number" id="input_flavorAmount" className="form-control-amount" placeholder="0" min="0"
                onChange={onChangeAmount} ref={inputAmountFlavors} onKeyDown={(e) => validateFloatNumbers(e)}
                onInput={(e) => validate(e)}
            />
            <div style={{ color: 'red', fontWeight: 'bold' }} ref={divAmountFlavorsValidation} />
        </td>

    );
}

const mapStateToProps = (state) => {
    return {
        flavorsListDownDispatch: state.flavorsListDownDispatch,
        flavorsDispatch: state.flavorsDispatch
    }
}

const mapDispatchToProps = {
    updateFlavorsListDown,
    updateFlavors
}

export default connect(mapStateToProps, mapDispatchToProps)(FlavorDispatchAmount);