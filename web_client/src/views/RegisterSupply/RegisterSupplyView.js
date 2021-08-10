import './styles/PriceType.css';
import Buttons from '../../common/Buttons';
import useHTTPGet from '../../hooks/useHTTPGet';
import { useRef, useEffect, useState } from 'react';
import Axios from 'axios';
import success from '../../utils/SuccessMessages/successTypeProduct';
import displayError from '../../utils/ErrorMessages/errorMessage';
import warningMessage from '../../utils/WarningMessages/warningMessage';

const PORT = require('../../config');

const RegisterSupplyView = () => {
    const typeSupplies = useHTTPGet(PORT() + '/api/typeSupplies');

    //#region VALIDATION

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const isFormDataValid = () => {
        const nameValid = validateName();
        const descriptionValid = validateDescription();
        const singlePriceValid = validateSinglePrice();
        const multiplePriceValid = validateMultiplePrice();
        const supplyStockLotValid = validateSupplyStockLot();
        const supplyUnitsByLotValid = validateSupplyUnitsByLot();
        const supplyStockValid = validateSupplyStock();
        const supplyTypeValid = validateSupplyType();

        return nameValid
            && descriptionValid
            && singlePriceValid
            && multiplePriceValid
            && supplyStockLotValid
            && supplyUnitsByLotValid
            && supplyStockValid
            && supplyTypeValid;
    };

    //#endregion

    //#region NAME

    const inputSupplyName = useRef('');
    const handleNameChange = () => {
        if (isFormSubmitted) {
            validateName();
        }
    };
    const divNameValidation = useRef(null);
    const [isValidNameClass, setIsValidNameClass] = useState("form-control");
    const validateName = () => {
        if (inputSupplyName.current.value.trim()) {
            setIsValidNameClass("form-control");
            divNameValidation.current.innerHTML = '';
            return true;
        }
        else {
            setIsValidNameClass("form-control is-invalid");
            divNameValidation.current.innerHTML = 'Ingrese un nombre';
            return false;
        }
    };

    //#endregion

    //#region DESCRIPTION

    const inputSupplyDescription = useRef('');
    const handleDescriptionChange = () => {
        if (isFormSubmitted) {
            validateDescription();
        }
    };
    const divDescriptionValidation = useRef(null);
    const [isValidDescriptionClass, setIsValidDescriptionClass] = useState("form-control");
    const validateDescription = () => {
        if (inputSupplyDescription.current.value.trim()) {
            setIsValidDescriptionClass("form-control");
            divDescriptionValidation.current.innerHTML = '';
            return true;
        }
        else {
            setIsValidDescriptionClass("form-control is-invalid");
            divDescriptionValidation.current.innerHTML = 'Ingrese una descripción';
            return false;
        }
    };

    //#endregion

    //#region SUPPLY SINGLE PRICE

    const inputSupplySinglePrice = useRef(0);
    const handleSupplySinglePriceChanged = () => {
        if (isFormSubmitted) {
            validateSinglePrice();
        }
    };
    const [isValidSinglePriceClass, setIsValidSinglePriceClass] = useState("form-control");
    const validateSinglePrice = () => {
        if (inputSupplySinglePrice.current.value) {
            setIsValidSinglePriceClass("form-control");
            return true;
        }
        else {
            setIsValidSinglePriceClass("form-control is-invalid");
            return false;
        }
    };

    //#endregion

    //#region SUPPLY MULTIPLE PRICE

    const inputSupplyMultiplePrice = useRef(0);
    const handleSupplyMultiplePriceChanged = () => {
        if (isFormSubmitted) {
            validateMultiplePrice();
        }
    };
    const [isValidMultiplePriceClass, setIsValidMultiplePriceClass] = useState("form-control");
    const validateMultiplePrice = () => {
        if (inputSupplyMultiplePrice.current.value) {
            setIsValidMultiplePriceClass("form-control");
            return true;
        }
        else {
            setIsValidMultiplePriceClass("form-control is-invalid");
            return false;
        }
    };

    //#endregion

    //#region SUPPLY TYPE

    const selectSupplyType = useRef('');
    const handleSupplyTypeChange = () => {
        if (isFormSubmitted) {
            validateSupplyType();
        }
    };
    const divSupplyTypeValidation = useRef(null);
    const [isValidSupplyTypeClass, setIsValidSupplyTypeClass] = useState("form-control");
    const validateSupplyType = () => {
        if (selectSupplyType.current.value > -1) {
            setIsValidSupplyTypeClass("form-control");
            divSupplyTypeValidation.current.innerHTML = '';
            return true;
        }
        else {
            setIsValidSupplyTypeClass("form-control is-invalid");
            divSupplyTypeValidation.current.innerHTML = 'Ingrese un nombre';
            return false;
        }
    };

    //#endregion

    //#region SUPPLY STOCK LOT

    const inputSupplyStockLot = useRef(0);
    const handleSupplyStockLotChanged = () => {
        if (isFormSubmitted) {
            validateSupplyStockLot();
        }
    };
    const [isValidSupplyStockLotClass, setIsValidSupplyStockLotClass] = useState("form-control");
    const validateSupplyStockLot = () => {
        if (inputSupplyStockLot.current.value) {
            setIsValidSupplyStockLotClass("form-control");
            return true;
        }
        else {
            setIsValidSupplyStockLotClass("form-control is-invalid");
            return false;
        }
    };

    //#endregion

    //#region SUPPLY UNITS BY LOT

    const inputSupplyUnitsByLot = useRef(0);
    const handleSupplyUnitsByLotChanged = () => {
        if (isFormSubmitted) {
            validateSupplyUnitsByLot();
        }
    };
    const [isValidSupplyUnitsByLotClass, setIsValidSupplyUnitsByLotClass] = useState("form-control");
    const validateSupplyUnitsByLot = () => {
        if (inputSupplyUnitsByLot.current.value) {
            setIsValidSupplyUnitsByLotClass("form-control");
            return true;
        }
        else {
            setIsValidSupplyUnitsByLotClass("form-control is-invalid");
            return false;
        }
    };

    //#endregion

    //#region SUPPLY STOCK

    const inputSupplyStock = useRef(0);
    const handleSupplyStockChanged = () => {
        if (isFormSubmitted) {
            validateSupplyStock();
        }
    };
    const [isValidSupplyStockClass, setIsValidSupplyStockClass] = useState("form-control");
    const validateSupplyStock = () => {
        if (inputSupplyStock.current.value) {
            setIsValidSupplyStockClass("form-control");
            return true;
        }
        else {
            setIsValidSupplyStockClass("form-control is-invalid");
            return false;
        }
    };

    //#endregion

    //#region SUBMIT

    const submitForm = () => {
        setIsFormSubmitted(true);

        if (isFormDataValid()) {
            registerSupply();
        }
        else {
            warningMessage('Atención', 'Revise los datos ingresados.', 'warning');
        };
    };

    const registerSupply = () => {
        const data = {
            name: inputSupplyName.current.value,
            description: inputSupplyDescription.current.value,
            id_supply_type: selectSupplyType.current.value,
            price_wholesale: inputSupplyMultiplePrice.current.value,
            price_retail: inputSupplySinglePrice.current.value,
            stock_lot: inputSupplyStock.current.value,
            stock_unit: inputSupplyStockLot.current.value,
            unit_x_lot: inputSupplyUnitsByLot.current.value
        };

        Axios.post(PORT() + '/api/supply/new', data)
            .then(({ data }) => {
                if (data.Ok) {
                    success();
                }
                else {
                    displayError('Ha ocurrido un error al registrar un insumo.');
                }
            })
            .catch(() => displayError('Ha ocurrido un error en el servidor.', 'Error'));
    };

    //#endregion

    return (
        <>
            <div className="viewTitle">
                <h1>Registrar Insumo</h1>
            </div>
            <div className="viewBody">
                <div className="formRow">
                    <div className="form-control-label">
                        <label htmlFor="supplyName" >Nombre*</label>
                    </div>
                    <div className="form-control-input">
                        <input className={isValidNameClass} id="supplyName" required type="text" ref={inputSupplyName} onChange={handleNameChange} placeholder="Ingrese nombre del insumo...">
                        </input>
                        <div style={{ color: 'red' }} ref={divNameValidation} />
                    </div>
                </div>
                <div className="formRow">
                    <div className="form-control-label">
                        <label htmlFor="supplyDescription">Descripción*</label>
                    </div>
                    <div className="form-control-input">
                        <textarea className={isValidDescriptionClass} id="supplyDescription" ref={inputSupplyDescription} onChange={handleDescriptionChange} placeholder="Ingrese descripción del insumo..." rows="3"></textarea>
                        <div style={{ color: 'red' }} ref={divDescriptionValidation} />
                    </div>
                </div>
                <div className="price-form-body ">
                    <div className="price-title">
                        <label >Precio*</label>
                    </div>
                    <div className="price-container">
                        <div className="price-type-container">
                            <label htmlFor="supplySinglePrice" className="price-type-label price-label">Minorista*</label>
                            <input className={isValidSinglePriceClass} id="supplySinglePrice" ref={inputSupplySinglePrice} onChange={handleSupplySinglePriceChanged} type="number" min="0" placeholder="Ingrese precio por menor..." />
                        </div>
                        <div className="price-type-container">
                            <label htmlFor="supplyMultiplePrice" className="price-type-label price-label">Mayorista*</label>
                            <input className={isValidMultiplePriceClass} id="supplyMultiplePrice" ref={inputSupplyMultiplePrice} onChange={handleSupplyMultiplePriceChanged} type="number" min="0" placeholder="Ingrese precio por mayor..." />
                        </div>
                    </div>
                </div>
                <div className="formRow">
                    <div className="form-control-label">
                        <label htmlFor="supplyType">Tipo*</label>
                    </div>
                    <div className="form-control-input">
                        <select className={isValidSupplyTypeClass} id="supplyType" defaultValue="-1" ref={selectSupplyType} onChange={handleSupplyTypeChange}>
                            <option disabled value="-1">Seleccione tipo de insumo...</option>
                            {
                                typeSupplies?.map((ts, i) => (
                                    <option key={i} value={ts.id_supply_type}>{ts.name}</option>
                                ))
                            }
                        </select>
                        <div style={{ color: 'red' }} ref={divSupplyTypeValidation} />
                    </div>
                </div>
                <div className="formRow">
                    <div className="form-control-label">
                        <label htmlFor="lotStock">Stock lotes*</label>
                    </div>
                    <div className="form-control-input">
                        <input className={isValidSupplyStockLotClass} id="lotStock" ref={inputSupplyStockLot} onChange={handleSupplyStockLotChanged} type="number" min="0" placeholder="Ingrese stock de lotes..." />
                    </div>
                </div>
                <div className="formRow">
                    <div className="form-control-label">
                        <label htmlFor="unitsPerLot">Cant. unidades por lote*</label>
                    </div>
                    <div className="form-control-input">
                        <input className={isValidSupplyUnitsByLotClass} id="unitsPerLot" ref={inputSupplyUnitsByLot} onChange={handleSupplyUnitsByLotChanged} type="number" min="0" placeholder="Ingrese cantidad de unidades por lote..." />
                    </div>
                </div>
                <div className="formRow">
                    <div className="form-control-label">
                        <label htmlFor="supplyStock">Stock actual del insumo*</label>
                    </div>
                    <div className="form-control-input">
                        <input className={isValidSupplyStockClass} id="supplyStock" ref={inputSupplyStock} onChange={handleSupplyStockChanged} type="number" min="0" placeholder="Ingrese stock actual del insumo..." />
                    </div>
                </div>
                <Buttons label='Registrar' ready={true} actionOK={submitForm} />
            </div>
        </>
    )
}

export default RegisterSupplyView;