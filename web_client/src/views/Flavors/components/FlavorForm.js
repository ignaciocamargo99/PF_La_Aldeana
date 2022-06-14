import { faIceCream } from '@fortawesome/free-solid-svg-icons'
import Breadcrumb from 'common/Breadcrumb'
import Buttons from 'common/Buttons'
import { useGetFlavorFamilies } from 'hooks/useGetFlavorFamilies'
import { useGetFlavorTypes } from 'hooks/useGetFlavorTypes'
import React, { useState } from 'react'
import validateFloatNumbers from 'utils/validateFloatNumbers'
import warnSweetAlert from 'utils/WarningMessages/warnSweetAlert'

const FlavorForm = ({ breadcrumbName, formTitle, flavorData, submitBtnText, onSubmit, isReading = false }) => {

    // #region hooks

    const { flavorTypes } = useGetFlavorTypes();
    const { flavorFamilies } = useGetFlavorFamilies();

    // #endregion

    // #region useStates

    const createFlavorModel = (flavorData) => {
        return {
            name: flavorData?.name || '',
            description: flavorData?.description || '',
            stock: flavorData?.stock || '',
            reorderStock: flavorData?.reorderStock || '',
            family_flavor: flavorData?.family_flavor || '',
            type_flavor: flavorData?.type_flavor || '',
        }
    };

    const initializeForm = () => {
        if (flavorData) {
            return createFlavorModel(flavorData);
        }
        return createFlavorModel();
    };

    const [formData, setFormData] = useState(initializeForm());

    const defaultInputStyle = 'form-control';
    const validInputStyle = 'form-control is-valid';
    const invalidInputStyle = 'form-control is-invalid';

    const [nameInputStyle, setNameInputStyle] = useState(defaultInputStyle);
    const [nameInputErrorText, setNameInputErrorText] = useState('');

    const [stockInputStyle, setStockInputStyle] = useState(defaultInputStyle);
    const [stockInputErrorText, setStockInputErrorText] = useState('');

    const [reorderStockInputStyle, setReorderStockInputStyle] = useState(defaultInputStyle);
    const [reorderStockInputErrorText, setReorderStockInputErrorText] = useState('');

    // #endregion

    // #region Validators

    // #region Name Validators 

    const isFormNameValid = () => {
        return formData?.name?.trim();
    };

    // #endregion

    // #region Stock Validators

    const isFormStockValid = () => {
        return isStockValid(formData.stock);
    };

    const isStockValid = (stock) => {
        if (!(stock)) {
            return true;
        }
        if (isNaN(stock)) {
            return false;
        }
        return (stock >= 0 && stock.toString().length <= 5);
    }

    // #endregion

    // #region ReorderStock Validators

    const isFormReorderStockValid = () => {
        return isValidReorderStock(formData.reorderStock);
    };

    const isValidReorderStock = (reorderStock) => {
        if (!(reorderStock)) {
            return false;
        }
        if (isNaN(reorderStock)) {
            return false;
        }
        return (reorderStock > 0 && reorderStock.toString().length <= 5);
    };

    const isFormReorderStockEmpty = () => {
        return (!(formData?.reorderStock));
    };

    // #endregion

    // #region FamilyFlavor Validators

    const isFamilyFlavorValid = () => {
        if (!(formData?.family_flavor)) {
            return false;
        }
        if (isNaN(formData.family_flavor)) {
            return false;
        }
        if (flavorFamilies) {
            return flavorFamilies.map((ff) => ff.id_family_flavor).includes(+formData.family_flavor);
        }
        return false;
    }

    // #endregion

    // #region FlavorType Validators

    const isTypeFlavorValid = () => {
        if (!(formData?.type_flavor)) {
            return false;
        }
        if (isNaN(formData.type_flavor)) {
            return false;
        }
        if (flavorTypes) {
            return flavorTypes.map((ft) => ft.idFlavorType).includes(+formData.type_flavor);
        }
        return false;
    };

    // #endregion

    const isFormDataValid = (warn = false) => {
        if (!(isFormNameValid())) {
            if (warn) {
                warnSweetAlert('Ingrese el nombre del sabor.');
            }
            return false;
        }
        if (!(isFormStockValid())) {
            if (warn) {
                warnSweetAlert('Ingrese el stock del sabor correctamente.');
            }
            return false;
        }
        if (!(isFormReorderStockValid())) {
            if (warn) {
                if (isFormReorderStockEmpty()) {
                    warnSweetAlert('Ingrese el stock de reorden.');
                } else {
                    warnSweetAlert('Stock de reorden inválido.');
                }
            }
            return false;
        }
        if (!(isFamilyFlavorValid())) {
            if (warn) {
                warnSweetAlert('Ingrese la familia del sabor.');
            }
            return false;
        }
        if (!(isTypeFlavorValid())) {
            if (warn) {
                warnSweetAlert('Ingrese la categoría del sabor.')
            }
            return false;
        }
        return true;
    };

    // #endregion

    const formDataValid = isFormDataValid();

    // #region OnInputChange

    const genericNumberInputErrorText = 'Ingrese un valor mayor a 0 y de hasta 5 cifras';
    const genericNumberInputErrorText2 = 'Ingrese un valor mayor o igual a 0 y de hasta 5 cifras';

    // #region OnNameChange

    const handleNameChange = ({ target }) => {
        let newFormData = { ...formData };
        newFormData.name = target.value;
        setFormData(newFormData);
        checkNameInputError(target.value);
    };

    const checkNameInputError = (nameInputValue) => {
        if (!nameInputValue) {
            setNameInputStyle(defaultInputStyle)
            setNameInputErrorText('');
            return;
        };

        if (nameInputValue.trim()) {
            setNameInputStyle(validInputStyle)
            setNameInputErrorText('');
            return;
        };

        setNameInputStyle(invalidInputStyle)
        setNameInputErrorText('Ingrese un nombre válido');
    };

    // #endregion

    // #region OnDescriptionChange

    const handleDescriptionChange = ({ target }) => {
        let newFormData = { ...formData }
        newFormData.description = target.value
        setFormData(newFormData)
    };

    // #endregion

    // #region OnStockChange

    const handleStockChange = ({ target }) => {
        let newFormData = { ...formData }
        newFormData.stock = target.value
        setFormData(newFormData)
        checkStockInputError(target.value)
    };

    const checkStockInputError = (stockInputValue) => {
        if (!stockInputValue) {
            setStockInputStyle(defaultInputStyle);
            setStockInputErrorText('');
            return;
        }
        if (isStockValid(stockInputValue)) {
            setStockInputStyle(validInputStyle);
            setStockInputErrorText('');
            return;
        }

        setStockInputStyle(invalidInputStyle);
        setStockInputErrorText(genericNumberInputErrorText2);
    };

    // #endregion

    // #region OnReorderStockChange

    const handleReorderStockChange = ({ target }) => {
        let newFormData = { ...formData }
        newFormData.reorderStock = target.value
        setFormData(newFormData)
        checkReorderStockInputError(target.value)
    };

    const checkReorderStockInputError = (reorderStockInputValue) => {
        if (!reorderStockInputValue) {
            setReorderStockInputStyle(defaultInputStyle);
            setReorderStockInputErrorText('');
            return;
        }
        if (isValidReorderStock(reorderStockInputValue)) {
            setReorderStockInputStyle(validInputStyle);
            setReorderStockInputErrorText('');
            return;
        }

        setReorderStockInputStyle(invalidInputStyle)
        setReorderStockInputErrorText(genericNumberInputErrorText);
    };

    // #endregion

    // #region OnFlavorTypeChange

    const handleFlavorTypeChange = ({ target }) => {
        let newFormData = { ...formData }
        newFormData.type_flavor = target.value
        setFormData(newFormData)
    };

    // #endregion

    // #region OnFlavorFamilyChange

    const handleFlavorFamilyChange = ({ target }) => {
        let newFormData = { ...formData }
        newFormData.family_flavor = target.value
        setFormData(newFormData)
    };

    // #endregion

    // #endregion

    // #region Submit/Cancel

    const warnFormDataInvalid = () => isFormDataValid(true);

    const handleCancelBtnClicked = () => window.location.replace('/app/flavors');

    const handleSubmitBtnClicked = () => onSubmit(formData);

    const ActionButtons = () => {
        if (isReading) {
            return (
                <div className='buttons'>
                    <button className='btn btn-light sendOk' onClick={handleCancelBtnClicked}>Volver</button>
                </div>
            )
        }

        return (
            <Buttons
                actionCancel={handleCancelBtnClicked}
                actionOK={handleSubmitBtnClicked}
                actionNotOK={warnFormDataInvalid}
                label={submitBtnText}
                ready={formDataValid}
            />
        )
    }

    // #endregion

    return (
        <>
            <Breadcrumb
                currentName={breadcrumbName}
                icon={faIceCream}
                parentLink='/app/flavors'
                parentName="Sabores"
            />
            <div className="viewTitle">
                <h1>{formTitle}</h1>
            </div>
            <div className="viewBody">
                <div className="formRow">
                    <div className="form-control-label">
                        <label className='col-3'>Nombre*</label>
                    </div>
                    <div className="form-control-input">
                        <input
                            autoFocus
                            className={nameInputStyle}
                            maxLength="80"
                            onChange={handleNameChange}
                            placeholder='Ingrese nombre del sabor...'
                            disabled={isReading}
                            type='text'
                            value={formData.name}
                        >
                        </input>
                        <div style={{ color: 'red', fontFamily: 'Abel', fontWeight: 'bold' }} >{nameInputErrorText}</div>
                    </div>
                </div>
                <div className="formRow">
                    <div className="form-control-label">
                        <label >Descripción (opcional)</label>
                    </div>
                    <div className="form-control-input">
                        <textarea
                            className="form-control"
                            maxLength="200"
                            onChange={handleDescriptionChange}
                            placeholder='Ingrese descripción del sabor...'
                            disabled={isReading}
                            type='text'
                            value={formData.description}
                        >
                        </textarea>
                    </div>
                </div>
                <div className="formRow">
                    <div className="form-control-label">
                        <label >Stock actual en baldes (opcional)</label>
                    </div>
                    <div className="form-control-input">
                        <input
                            className={stockInputStyle}
                            onChange={handleStockChange}
                            onKeyDown={(e) => validateFloatNumbers(e)}
                            placeholder={isReading ? "" : "Ingrese stock actual..."}
                            disabled={isReading}
                            type="number"
                            value={formData.stock}
                        />
                        <div style={{ color: 'red', fontFamily: 'Abel', fontWeight: 'bold' }} >{stockInputErrorText}</div>
                    </div>
                </div>
                <div className="formRow">
                    <div className="form-control-label">
                        <label >Stock de reorden*</label>
                    </div>
                    <div className="form-control-input">
                        <input
                            className={reorderStockInputStyle}
                            onChange={handleReorderStockChange}
                            onKeyDown={(e) => validateFloatNumbers(e)}
                            placeholder={isReading ? "" : "Ingrese stock de reorden..."}
                            disabled={isReading}
                            type="number"
                            value={formData.reorderStock}
                        />
                        <div style={{ color: 'red', fontFamily: 'Abel', fontWeight: 'bold' }} >{reorderStockInputErrorText}</div>
                    </div>
                </div>
                <div className="formRow">
                    <div className="form-control-label">
                        <label >Familia*</label>
                    </div>
                    <div className="form-control-input">
                        <select className="form-control"
                            value={formData.family_flavor}
                            disabled={isReading}
                            onChange={handleFlavorFamilyChange}
                        >
                            <option disabled value=''>Seleccione familia de sabor...</option>
                            {flavorFamilies?.map((ff, i) => {
                                return (
                                    <option
                                        key={ff.id_family_flavor}
                                        value={ff.id_family_flavor}
                                    >
                                        {ff.name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="formRow">
                    <div className="form-control-label">
                        <label >Categoría*</label>
                    </div>
                    <div className="form-control-input">
                        <select className="form-control"
                            onChange={handleFlavorTypeChange}
                            disabled={isReading}
                            value={formData.type_flavor}
                        >
                            <option disabled value=''>Seleccione categoría de sabor...</option>
                            {flavorTypes?.map((ft, i) => {
                                return (
                                    <option
                                        key={ft.idFlavorType}
                                        value={ft.idFlavorType}
                                    >
                                        {ft.name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <ActionButtons />
            </div>
        </>
    )
};

export default FlavorForm;
