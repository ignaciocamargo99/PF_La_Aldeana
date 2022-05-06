import BeShowed from 'common/BeShowed';
import React, { useEffect, useRef, useState } from 'react';
import SectorProduct from '../../../RegisterProduct/components/SectorProduct';

export default function DataProductType({ productType, loadData }) {
    const divNameValidation = useRef(null);
    const checkIsSendByDelivery = useRef(null);
    const name = useRef(null);
    const description = useRef(null);
    const [isValidName, setIsValidName] = useState("form-control");
    const [isValidDescription, setIsValidDescription] = useState("form-control");
    const [nameTypeProduct, setNameTypeProduct] = useState();
    const [descriptionTypeProduct, setDescriptionTypeProduct] = useState();

    useEffect(() => {
        if (!productType.reading) {
            // Update states and refs
            setNameTypeProduct(productType.name);
            name.current.value = productType.name;
            setDescriptionTypeProduct(productType.description)
            description.current.value = productType.description;
            setIsValidName("form-control is-valid");
            setIsValidDescription("form-control is-valid");
            if (productType.send_delivery === 1) checkIsSendByDelivery.current.checked = true;
            else checkIsSendByDelivery.current.checked = false;
        }
    }, [productType])


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
            setIsValidDescription("form-control is-valid");
            productType.description = e.target.value;
            loadData(productType);
        }
        else {
            setIsValidDescription("form-control");
            productType.description = null
            loadData(productType);
        }
    }

    const onChangeChkBox = (e) => {
        if (!e.target.checked) {
            productType.send_delivery = 0;
            loadData(productType);
        }
        else {
            productType.send_delivery = 1;
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
                            ref={name}
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
                        <textarea type='text' className={isValidDescription}
                            placeholder='Ingrese descripción del tipo de producto...' maxLength="150"
                            onChange={onChangeDescription}
                            ref={description}
                            defaultValue={descriptionTypeProduct}
                        ></textarea>
                    </BeShowed>
                </div>
            </div>
            <SectorProduct load={loadData} data={productType} />
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
                        <input
                            type='checkbox'
                            className="form-check-input"
                            ref={checkIsSendByDelivery}
                            onChange={onChangeChkBox}
                        ></input>
                    </BeShowed>
                </div>
            </div>
        </>
    )
}