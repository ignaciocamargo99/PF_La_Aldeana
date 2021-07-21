import React from 'react';
import { useRef, useState } from 'react';
import Axios from 'axios';
import success from '../../utils/SuccessMessages/successTypeProduct';
import Buttons from '../../common/Buttons';
import './RegisterTypeProductView.css';
import './styles/TypeProductForm.css';
import warningMessage from '../../utils/WarningMessages/warningMessage';

const PORT = require('../../config');

export default function RegisterTypeProductView() {
    const [ready, setReady] = useState(false);
    const inputName = useRef(null);
    const inputDescription = useRef(null);

    const registerTypeProduct = () => {
        const name = inputName.current.value;
        const description = inputDescription.current.value;
        try {
            if (name !== "") {
                Axios.post(PORT() + '/api/typeProduct/new', {
                    name: name,
                    description: description
                })
                    .then(success())
                    .catch(err => console.error(err))
            }
            else throw new Error
        }
        catch (Error) {
            throw warningMessage('Atención', 'Ingrese un nombre para el tipo de producto', 'warning');
        }
    }

    const onChangeButton = () => {
        if (inputName.current.value !== "") setReady(true);
        else setReady(false);
    }

    const cancelTypeProduct = () => window.location.reload();

    return (
        <>
            <div className="viewTitle">
                <h1>Registrar tipo de producto</h1>
            </div>
            <div className="viewBody">
                <div className="formRow">
                    <div className="form-control-label">
                        <label className='col-3'>Nombre*</label>
                    </div>
                    <div className="form-control-input">
                        <input type='text' className='form-control' ref={inputName} onChange={onChangeButton} placeholder='Ingrese nombre del producto...'></input>
                    </div>
                </div>
                <div className="formRow">
                    <div className="form-control-label">
                        <label className='col-3 lbTexttarea'>Descripción</label>
                    </div>
                    <div className="form-control-input">
                        <textarea type='text' className='form-control' ref={inputDescription} placeholder='Ingrese descripción del producto...'></textarea>
                    </div>
                </div>
                <Buttons label='Registrar' ready={ready} actionOK={registerTypeProduct} actionCancel={cancelTypeProduct} />
            </div>
        </>
    )
}