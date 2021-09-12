import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { updateTableUp } from '../../../actions/TableUpDownActions';
import validateFloatNumbers from '../../../utils/Validations/validateFloatNumber';

const FlavorDispatchAmount = (props) => {
    const inputAmountFlavors = useRef(null);
    const divAmountFlavorsValidation = useRef(null);

    const onChangeAmount = () => {
        if (inputAmountFlavors.current.value < 0 && inputAmountFlavors.current.value.length <= 3) divAmountFlavorsValidation.current.innerHTML = 'Ingrese un número mayor a 0';
        else {
            divAmountFlavorsValidation.current.innerHTML = '';
            props.elementsTableUp[props.keyElement].amount = inputAmountFlavors.current.value;
        }
    }

    const validate = (e) => {
        if (e.target.value.length > 3) e.target.value = e.target.value.slice(0, 3);
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
        elementsTableUp: state.elementsTableUp
    }
}

const mapDispatchToProps = {
    updateTableUp,
}

export default connect(mapStateToProps, mapDispatchToProps)(FlavorDispatchAmount);