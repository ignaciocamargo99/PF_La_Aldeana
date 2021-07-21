
import Line from '../../../../common/Line';
import React from 'react'
import useHTTPGet from '../../../../hooks/useHTTPGet';
import ImageProduct from '../ImageProduct';

const PORT = require('../../../../config');

export default function GeneralDataSupply() {

    const typeSupplies = useHTTPGet(PORT() + '/api/typeSupplies')

    return (
        <div id='General'>
            <h5>Insumo</h5>
            <Line />
            <br />
            <div className="row justify-content-start camp">
                <label className='col-3'>Nombre*</label>
                <input type='text' className='inputText col-8' placeholder='Ingrese nombre del producto...'></input>
            </div>

            <div className="row justify-content-start camp">
                <label className='col-3 lbTexttarea'>Descripción</label>
                <textarea type='text' className='col-8' placeholder='Ingrese descripción del producto...'></textarea>
            </div>
            <div className='formRow'>
                <div className="form-control-label">
                    <label htmlFor="supplyTypeSupply">Tipo de insumo*</label>
                </div>
                <input className="form-control " list="typeSuppliesDatalist" id="supplyTypeSupply" placeholder="Seleccione tipo de insumo...">
                </input>
                <datalist id="typeSuppliesDatalist">
                    {typeSupplies?.map((s) => {
                        return (
                            <option key={s.id_supply_type} value={s.name}>
                            </option>
                        )
                    })}
                </datalist>
            </div>
            <div className="form">
                <ImageProduct />
            </div>
        </div>

    );
}