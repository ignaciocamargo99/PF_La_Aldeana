import React, { useRef } from 'react';
import Line from '../../../common/Line';

export default function PriceSupply() {

    const inputPriceWholesaler = useRef(null);
    const inputPriceRetailer = useRef(null);
    const divPriceValidation = useRef(null);


    const onChangePrice = () => {
        if (inputPriceRetailer.current.value <= 0 || inputPriceWholesaler.current.value <= 0) divPriceValidation.current.innerHTML = "Ingrese un valor mayor a 0 y válido para ambos precios";
        else divPriceValidation.current.innerHTML = "";
    }

    return (
        <div id='Precio'>
            <h5>Precio</h5>
            <Line />
            <br />
            <div className="formRow">
                <label className='col-md-2'>Minorista*</label>
                <input type='number' className='inputText col-md-3' ref={inputPriceRetailer} onChange={onChangePrice} min="0"></input>
                <label className='col-md-2'>Mayorista*</label>
                <input type='number' className='inputText col-md-3' ref={inputPriceWholesaler} onChange={onChangePrice} min="0"></input>
            </div>
            <div style={{ color: 'red', padding: '0px 0px 10px 0px' }} ref={divPriceValidation} />
        </div>
    );
}