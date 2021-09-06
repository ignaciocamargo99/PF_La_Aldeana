import React, {useEffect, useRef, useState} from 'react';
import validateFloatNumbers from '../../../utils/Validations/validateFloatNumbers';
import { updateMultiplePrice } from '../../../actions/SupplyActions';
import { connect } from 'react-redux';
import '../styles/PriceType.css';

const MultiplePrice = (props) => {

    const inputMultiplePrice = useRef(null);
    const [prevMultiplePrice, setPrevMultiplePrice] = useState("null");
    const [isValidClass, setIsValidClass] = useState("form-control");

    const handleMultiplePrice = () => {
        setPrevMultiplePrice(props.multiplePrice);
        props.updateMultiplePrice(Math.trunc(inputMultiplePrice.current.value));
    }

    useEffect(() => {
        if (inputMultiplePrice.current.value > 0 && inputMultiplePrice.current.value <= 99999999) {
            setIsValidClass("form-control is-valid");
            props.updateMultiplePrice(Math.trunc(inputMultiplePrice.current.value));
        } else if (prevMultiplePrice !== "null") {
            setIsValidClass("form-control is-invalid");
            props.updateMultiplePrice(0);
        }
    }, [props.multiplePrice]);

    return(
        <div className="price-type-container">
            <label htmlFor="supplyMultiplePrice" className="price-type-label price-label">Mayorista*</label>
            <input className={isValidClass} id="supplyMultiplePrice" type="number" min='0' ref={inputMultiplePrice} placeholder="Ingrese precio por mayor..."  max="99999999"
            onKeyDown={(e) => validateFloatNumbers(e)} onChange={handleMultiplePrice}>
            </input>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        multiplePrice: state.multiplePrice
    }
}

const mapDispatchToProps = {
    updateMultiplePrice
}


export default connect(mapStateToProps, mapDispatchToProps)(MultiplePrice);