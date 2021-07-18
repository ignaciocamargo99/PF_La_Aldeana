import React, { useRef } from "react";
import '../styles/Form.css';

const PriceProduct = () => {
    const inputPrice = useRef(null);
    const labelValidationPrice = useRef(null);

    const onChangePrice = () => {
        if (inputPrice.current.value <= 0) labelValidationPrice.current.innerHTML = "Ingrese un número mayor a 0"
        else labelValidationPrice.current.innerHTML = "";
    };

    return (
        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="productPrice" >Precio*</label>
            </div>
            <div className="form-control-input">
                <input className="form-control" id="productPrice" type="number" min="0" ref={inputPrice} onChange={onChangePrice} placeholder="Ingrese precio del producto..." />
                <label style={{ color: 'red' }} ref={labelValidationPrice} />
            </div>
        </div>
    );
}

export default PriceProduct;