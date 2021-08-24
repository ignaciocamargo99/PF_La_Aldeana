import Axios from 'axios';
import React, { useRef, useState, useEffect} from 'react';
import Buttons from '../../common/Buttons';
import success from '../../utils/SuccessMessages/successTypeProduct';
import warningMessage from '../../utils/WarningMessages/warningMessage';
import './RegisterTypeProductView.css';
import './styles/TypeProductForm.css';
import displayError from '../../utils/ErrorMessages/displayError';
import SectorProduct from '../RegisterProduct/components/SectorProduct';

const PORT = require('../../config');

export default function RegisterTypeProductView() {
    const [data, setData] = useState({name: 'null', description: 'null', id_sector: -1});
    const [ready, setReady] = useState(false);
    const inputName = useRef(null);
    const inputDescription = useRef(null);
    const divNameValidation = useRef(null);
    const [isValidName, setIsValidName] = useState("form-control");
    const [sectorTypeProductChild, setSectorTypeProductChild] = useState(2);
    const [nameTypeProductChild, setNameTypeProductChild] = useState('null');


    const load = (childData) => {
        setData(childData)
        setSectorTypeProductChild(childData.id_sector);
    }

    useEffect(()=>{
        if (data.id_sector > -1 && sectorTypeProductChild > -1 && 
            data.name.length > 0 && data.name.length < 50 && data.name !== 'null'){
                setReady(true);
            } else {
                setReady(false);
            }
    }, [sectorTypeProductChild, nameTypeProductChild]);

    const registerTypeProduct = () => {
        const description = inputDescription.current.value.trim();
        try {
            if (ready) {
                Axios.post(PORT() + '/api/typeProduct/new', {
                    name: data.name,
                    description: description,
                    id_sector: data.id_sector
                })
                    .then(({data}) =>{
                        if(data.Ok) success();
                        else displayError(data.Message);
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
            setNameTypeProductChild(name)
            let dat = data;
            dat.name = name;
            setData(dat);
        }
        else if(name.length > 0 && name.length < 50){
            setIsValidName("form-control is-valid");
            divNameValidation.current.innerHTML = "";
            setNameTypeProductChild(name)
            let dat = data;
            dat.name = name;
            setData(dat);
        }
        else {
            setIsValidName("form-control is-invalid");
            divNameValidation.current.innerHTML = "El nombre es un campo obligatorio y debe ser menor a 50 caracteres.";
            setNameTypeProductChild('null')
            let dat = data;
            dat.name = 'null';
            setData(dat);
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
                <SectorProduct load={load} data={data}/>
                <Buttons label='Registrar' ready={ready} actionOK={registerTypeProduct} actionNotOK={registerTypeProduct} actionCancel={cancelTypeProduct} />
            </div>
        </>
    )
}