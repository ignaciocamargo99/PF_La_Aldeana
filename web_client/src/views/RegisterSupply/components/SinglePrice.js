import React, { useEffect, useRef, useState } from 'react';
import validateFloatNumbers from '../../../utils/Validations/validateFloatNumbers';
import { updateSinglePrice } from '../../../actions/SupplyActions';
import { connect } from 'react-redux';
import BeShowed from 'common/BeShowed';

const SinglePrice = (props) => {
    const inputSinglePrice = useRef(null);
    const [singlePriceSupply, setSinglePriceSupply] = useState();
    const [prevSinglePrice, setPrevSinglePrice] = useState("null");
    const [isValidClass, setIsValidClass] = useState("form-control");

    const handleSinglePrice = () => {
        setPrevSinglePrice(props.singlePrice);
        props.updateSinglePrice(Math.trunc(inputSinglePrice.current.value));
        if (props.data.editing) {
            props.data.price_retail = inputSinglePrice.current.value;
            props.load(props.data)
        }
    }

    useEffect(() => {
        if (props.data.price_retail) {
            setSinglePriceSupply(props.data.price_retail);
            inputSinglePrice.current.value = props.data.price_retail;
        }
    }, [])

    useEffect(() => {
        if (inputSinglePrice.current.value > 0 && inputSinglePrice.current.value <= 99999999) {
            setIsValidClass("form-control is-valid");
            props.updateSinglePrice(Math.trunc(inputSinglePrice.current.value));
        } else if (prevSinglePrice !== "null") {
            setIsValidClass("form-control is-invalid");
            props.updateSinglePrice(0);
        }
    }, [props.singlePrice]);

    return (
        <>
            <BeShowed show={!props.data.reading && !props.data.editing}>
                <div className="price-type-container">
                    <label htmlFor="supplySinglePrice" className="price-type-label price-label">Minorista*</label>
                    <input className={isValidClass} id="supplySinglePrice" type="number" min='0' ref={inputSinglePrice} placeholder="Ingrese precio por menor..." max="99999999"
                        onKeyDown={(e) => validateFloatNumbers(e)} onChange={handleSinglePrice} />
                </div>
            </BeShowed>
            <BeShowed show={props.data.reading}>
                <div className="formRow">
                    <div className="form-control-label">
                        <label htmlFor="supplySinglePrice">Precio minorista*</label>
                    </div>
                    <div className="form-control-input">
                        <input className="form-control is-valid" id="supplySinglePrice" type="number" readOnly value={props.data.price_retail} ref={inputSinglePrice} />
                    </div>
                </div>
            </BeShowed>
            <BeShowed show={props.data.editing}>
                <div className="price-type-container">
                    <label htmlFor="supplySinglePrice" className="price-type-label price-label">Minorista*</label>
                    <input className={isValidClass} id="supplySinglePrice" type="number" min='0' ref={inputSinglePrice} placeholder="Ingrese precio por menor..." max="99999999"
                        onKeyDown={(e) => validateFloatNumbers(e)} defaultValue={singlePriceSupply} onChange={handleSinglePrice} />
                </div>
            </BeShowed>
        </>
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