import React, { useEffect, useRef, useState } from 'react';
import validateFloatNumbers from '../../../utils/Validations/validateFloatNumbers';
import { updateMultiplePrice } from '../../../actions/SupplyActions';
import { connect } from 'react-redux';
import '../styles/PriceType.css';
import BeShowed from 'common/BeShowed';

const MultiplePrice = (props) => {

    const inputMultiplePrice = useRef(null);
    const [prevMultiplePrice, setPrevMultiplePrice] = useState("null");
    const [isValidClass, setIsValidClass] = useState("form-control");

    const handleMultiplePrice = () => {
        setPrevMultiplePrice(props.multiplePrice);
        props.updateMultiplePrice(Math.trunc(inputMultiplePrice.current.value));
    }

    useEffect(() => {
        if (!props.data.reading) {
            if (inputMultiplePrice.current.value > 0 && inputMultiplePrice.current.value <= 99999999) {
                setIsValidClass("form-control is-valid");
                props.updateMultiplePrice(Math.trunc(inputMultiplePrice.current.value));
            } else if (prevMultiplePrice !== "null") {
                setIsValidClass("form-control is-invalid");
                props.updateMultiplePrice(0);
            }
        }
    }, [props.multiplePrice]);

    return (
        <>
            <BeShowed show={!props.data.reading}>
                <div className="price-type-container">
                    <label htmlFor="supplyMultiplePrice" className="price-type-label price-label">Mayorista*</label>
                    <input className={isValidClass} id="supplyMultiplePrice" type="number" min='0' ref={inputMultiplePrice} placeholder="Ingrese precio por mayor..." max="99999999"
                        onKeyDown={(e) => validateFloatNumbers(e)} onChange={handleMultiplePrice}>
                    </input>
                </div>
            </BeShowed>
            <BeShowed show={props.data.reading}>
                <div className="formRow">
                    <div className="form-control-label">
                        <label htmlFor="supplyMultiplePrice">Precio mayorista*</label>
                    </div>
                    <div className="form-control-input">
                        <input className="form-control is-valid" id="supplyMultiplePrice" type="number" readOnly value={props.data.price_retail} />
                    </div>
                </div>
            </BeShowed>
        </>
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