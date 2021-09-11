import React from 'react';
import '../styles/ChamberFlavorsDispatch.css';

export default function ChamberFlavorsDispatch() {
    return (
        <form>
            <div className="viewContent">
                <h1 className="display-5">Registrar salida de productos de cámara</h1>
                <hr />
                <div className="formRow">
                    <div className="form-control-label">
                        <label className='col-3' style={{fontSize:'34px'}}>Cantidad*</label>
                    </div>
                    <div className="form-control-input">
                        <input type='text' className='form-control' placeholder='Ingrese nombre del producto...'></input>
                    </div>
                </div>
                <div className="formRow">
                    <div className="form-control-label">
                        <label className='col-3' style={{fontSize:'34px'}}>Cantidad*</label>
                    </div>
                    <div className="form-control-input">
                        <input type='text' className='form-control' placeholder='Ingrese nombre del producto...'></input>
                    </div>
                </div>
            </div>
        </form>
    );
}