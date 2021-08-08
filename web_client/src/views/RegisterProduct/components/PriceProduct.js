import React, { useRef, useState } from "react";
import validateFloatNumbers from '../../../utils/validateFloatNumbers';

const PriceProduct = (props) => {
    const inputPrice = useRef(null);
    const [isValidClass, setIsValidClass] = useState("form-control");
    const divPriceValidation = useRef(null);

    const onChangePrice = () => {
        if (inputPrice.current.value > 0 && inputPrice.current.value.length <= 5) {
            setIsValidClass("form-control is-valid");
            divPriceValidation.current.innerHTML = '';
            let data = props.data;
            data.price = inputPrice.current.value;
            props.load(data);
        }
        else {
            setIsValidClass("form-control is-invalid");
            divPriceValidation.current.innerHTML = 'El precio debe ser mayor a 0 y de hasta 5 cifras';
            let data = props.data;
            data.price = -1;
            props.load(data);
        }
    };

    return (
        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="productPrice" >Precio*</label>
            </div>
            <div className="form-control-input">
                <input className={isValidClass} id="productPrice" type="number" min="0" ref={inputPrice}
                    onChange={onChangePrice} placeholder="Ingrese precio del producto..."
                    defaultValue={props.data.price} onKeyDown={(e) => validateFloatNumbers(e)} />
                <div style={{ color: 'red', fontFamily: 'Abel', fontWeight: 'bold' }} ref={divPriceValidation} />
            </div>
        </div>
    );
}

export default PriceProduct;