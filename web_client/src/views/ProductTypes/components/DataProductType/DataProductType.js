import Axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import Buttons from '../../../../common/Buttons';
import success from '../../../../utils/SuccessMessages/successTypeProduct';
import warningMessage from '../../../../utils/WarningMessages/warningMessage';
// import './RegisterTypeProductView.css';
// import './styles/TypeProductForm.css';
import displayError from '../../../../utils/ErrorMessages/displayError';
import SectorProduct from '../../../RegisterProduct/components/SectorProduct';
import Breadcrumb from '../../../../common/Breadcrumb';
import { faIceCream } from '@fortawesome/free-solid-svg-icons';
import BeShowed from 'common/BeShowed';

export default function DataProductType({ productType, loadData }) {
    const divNameValidation = useRef(null);
    const checkIsSendByDelivery = useRef(null);
    const [isValidName, setIsValidName] = useState("form-control");
    const [sectorTypeProductChild, setSectorTypeProductChild] = useState(-1);
    const [nameTypeProduct, setNameTypeProduct] = useState();
    const [descriptionTypeProduct, setDescriptionTypeProduct] = useState()

    useEffect(() => {
        setNameTypeProduct(productType.name);
        setDescriptionTypeProduct(productType.description)
    }, [productType])

    const validate = () => {
        if (nameTypeProduct === 'null') {
            warningMessage('Atención', 'Ingrese un nombre valido para el tipo de producto', 'warning')
        } else if (sectorTypeProductChild < 0) {
            warningMessage('Atención', 'Ingrese un rubro valido para el tipo de producto', 'warning')
        }
    }


    const onChangeName = (e) => {
        setNameTypeProduct(e.target.value);
        const name = e.target.value.trim();
        if (name.length > 0 && name.length < 50) {
            setIsValidName("form-control is-valid");
            divNameValidation.current.innerHTML = "";
            productType.name = e.target.value
            loadData(productType);
        }
        else {
            setIsValidName("form-control is-invalid");
            divNameValidation.current.innerHTML = "El nombre es un campo obligatorio y debe ser menor a 50 caracteres.";
            productType.name = null
            loadData(productType);
        }
    }

    const onChangeDescription = (e) => {
        setDescriptionTypeProduct(e.target.value);
        const description = e.target.value.trim();
        if (description.length > 0 && description.length < 50) {
            productType.description = e.target.value
            loadData(productType);
        }
        else {
            productType.description = null
            loadData(productType);
        }
    }


    return (
        <>
            <div className="formRow">
                <div className="form-control-label">
                    <label className='col-3'>Nombre*</label>
                </div>
                <div className="form-control-input">
                    <BeShowed show={productType.reading}>
                        <input type='text' className="form-control is-valid" readOnly value={productType.name} />
                    </BeShowed>
                    <BeShowed show={!productType.reading}>
                        <input type='text' className={isValidName} autoFocus
                            onChange={onChangeName}
                            placeholder='Ingrese nombre del tipo de producto...'
                            defaultValue={nameTypeProduct}
                        />
                        <div style={{ color: 'red', fontFamily: 'Abel', fontWeight: 'bold' }} ref={divNameValidation} />
                    </BeShowed>
                </div>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label className='col-3 lbTexttarea'>Descripción</label>
                </div>
                <div className="form-control-input">
                    <BeShowed show={productType.reading}>
                        <textarea type='text'
                            className={productType.description ? "form-control is-valid" : "form-control"}
                            value={productType.description} readOnly></textarea>
                    </BeShowed>
                    <BeShowed show={!productType.reading}>
                        <textarea type='text' className="form-control"
                            placeholder='Ingrese descripción del tipo de producto...' maxLength="150"
                            onChange={onChangeDescription}
                            defaultValue={descriptionTypeProduct}
                        ></textarea>
                    </BeShowed>
                </div>
            </div>
            <SectorProduct /* load={load} */ data={productType} />
            <div className="formRow">
                <div className="form-control-label">
                    <label className='lbTexttarea'>Acepta envío por delivery</label>
                </div>
                <div className="form-control-input">
                    <BeShowed show={productType.reading}>
                        <input type='checkbox'
                            className="form-check-input"
                            value={productType.send_delivery}
                            checked={productType.send_delivery === 1 ? true : false}
                            disabled />
                    </BeShowed>
                    <BeShowed show={!productType.reading}>
                        <input type='checkbox' className="form-check-input" ref={checkIsSendByDelivery}></input>
                    </BeShowed>
                </div>
            </div>
        </>
    )
}