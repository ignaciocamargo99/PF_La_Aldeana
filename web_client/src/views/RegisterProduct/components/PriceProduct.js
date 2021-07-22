import React, { useRef } from "react";

const PriceProduct = (props) => {
    
    const inputPrice = useRef(null);
    const divPriceValidation = useRef(null);

    const onChangePrice = () => {
        if (inputPrice.current.value <= 0) divPriceValidation.current.innerHTML = "Ingrese un número mayor a 0";
        else divPriceValidation.current.innerHTML = "";
        let data = props.data;
        data.price = inputPrice.current.value;
        props.load(data);
    };

    return (
        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="productPrice" >Precio*</label>
            </div>
            <div className="form-control-input">
                <input className="form-control" id="productPrice" type="number" min="0" ref={inputPrice} onChange={onChangePrice} placeholder="Ingrese precio del producto..." />
                <div style={{ color: 'red' }} ref={divPriceValidation} />
            </div>
        </div>
    );
}

export default PriceProduct;