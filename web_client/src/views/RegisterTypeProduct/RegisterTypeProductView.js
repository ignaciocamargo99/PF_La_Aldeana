import Axios from 'axios';
import React, { useRef, useState} from 'react';
import Buttons from '../../common/Buttons';
import success from '../../utils/SuccessMessages/successTypeProduct';
import warningMessage from '../../utils/WarningMessages/warningMessage';
import './RegisterTypeProductView.css';
import './styles/TypeProductForm.css';
import displayError from '../../utils/ErrorMessages/displayError';

const PORT = require('../../config');

export default function RegisterTypeProductView() {
    const [ready, setReady] = useState(false);
    const inputName = useRef(null);
    const inputDescription = useRef(null);
    const divNameValidation = useRef(null);
    const [isValidName, setIsValidName] = useState("form-control");

    const registerTypeProduct = () => {
        const name = inputName.current.value.trim();
        const description = inputDescription.current.value.trim();
        try {
            if (ready) {
                Axios.post(PORT() + '/api/typeProduct/new', {
                    name: name,
                    description: description
                })
                    .then(({data}) =>{
                        if(data.Ok) success();
                        else displayError('Ha ocurrido un error al registrar el tipo de producto. \n' + data.Message);
                    })
                    .catch(err => console.error(err))
            }
            else throw new Error
        }
        catch (Error) { throw warningMessage('Atención', 'Ingrese un nombre válido para el tipo de producto', 'warning') };
    }

    const onChangeName = () => {
        const name = inputName.current.value.trim();
        if (name.length > 0 && name.length < 50) {
            setIsValidName("form-control is-valid");
            divNameValidation.current.innerHTML = "";
            setReady(true);
        }
        else if(name.length > 0 && name.length < 50){
            setIsValidName("form-control is-valid");
            divNameValidation.current.innerHTML = "";
        }
        else {
            setIsValidName("form-control is-invalid");
            divNameValidation.current.innerHTML = "El nombre es un campo obligatorio y debe ser menor a 50 caracteres.";
            setReady(false);
        }
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
                        <input type='text' className={isValidName} ref={inputName} autoFocus onChange={onChangeName} placeholder='Ingrese nombre del producto...'></input>
                        <div style={{ color: 'red', fontFamily:'Abel', fontWeight: 'bold' }} ref={divNameValidation} />
                    </div>
                </div>
                <div className="formRow">
                    <div className="form-control-label">
                        <label className='col-3 lbTexttarea'>Descripción</label>
                    </div>
                    <div className="form-control-input">
                        <textarea type='text' className="form-control" ref={inputDescription} placeholder='Ingrese descripción del producto...' maxLength="150"></textarea>
                    </div>
                </div>
                <Buttons label='Registrar' ready={ready} actionOK={registerTypeProduct} actionNotOK={registerTypeProduct} actionCancel={cancelTypeProduct} />
            </div>
        </>
    )
}