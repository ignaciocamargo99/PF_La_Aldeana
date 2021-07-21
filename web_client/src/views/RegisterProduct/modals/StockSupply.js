
import React from 'react';
import Line from '../../../common/Line';

export default function DetailSupplies() {

    return (
        <div id='extra'>
            <h5>Stock</h5>
            <Line />
            <br />
            <div className="row justify-content-start camp">
                <label className='col-md-5'>Stock lotes*</label>
                <input type='number' className='inputText col-md-6' min="0"></input>
            </div>
            <div className="row justify-content-start camp">
                <label className='col-md-5'>Cant. unidades por lote*</label>
                <input type='number' className='inputText col-md-6' min="0"></input>
            </div>
            <div className="row justify-content-start camp">
                <label className='col-md-5'>Stock unidades*</label>
                <input type='number' className='inputText col-md-6' min="0"></input>
            </div>
        </div>
    );

}