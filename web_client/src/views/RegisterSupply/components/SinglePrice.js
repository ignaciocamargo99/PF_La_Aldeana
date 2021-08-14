import React, {useEffect, useRef, useState} from 'react';
import validateFloatNumbers from '../../../utils/Validations/validateFloatNumbers';
import { updateSinglePrice } from '../../../actions/SupplyActions';
import { connect } from 'react-redux';

const SinglePrice = (props) => {

    const inputSinglePrice = useRef(null);
    const [prevSinglePrice, setPrevSinglePrice] = useState("null");
    const [isValidClass, setIsValidClass] = useState("form-control");

    const handleSinglePrice = () => {
        setPrevSinglePrice(props.singlePrice);
        props.updateSinglePrice(Math.trunc(inputSinglePrice.current.value));
    }

    useEffect(() => {
        if (inputSinglePrice.current.value > 0 && inputSinglePrice.current.value <= 99999999) {
            setIsValidClass("form-control is-valid");
            props.updateSinglePrice(Math.trunc(inputSinglePrice.current.value));
        } else if (prevSinglePrice !== "null") {
            setIsValidClass("form-control is-invalid");
        }
    }, [props.singlePrice]);

    return(
        <div className="price-type-container">
            <label htmlFor="supplySinglePrice" className="price-type-label price-label">Minorista*</label>
            <input className={isValidClass} id="supplySinglePrice" type="number" min='0' ref={inputSinglePrice} placeholder="Ingrese precio por menor..."  max="99999999"
            onKeyDown={(e) => validateFloatNumbers(e)} onChange={handleSinglePrice}>
            </input>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        singlePrice: state.singlePrice
    }
}

const mapDispatchToProps = {
    updateSinglePrice
}


export default connect(mapStateToProps, mapDispatchToProps)(SinglePrice);