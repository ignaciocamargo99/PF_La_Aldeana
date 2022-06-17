import { faIceCream } from '@fortawesome/free-solid-svg-icons'
import Breadcrumb from 'common/Breadcrumb'
import ActionButtons from 'common/Form/ActionButtons'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import warnSweetAlert from 'utils/WarningMessages/warnSweetAlert'
import validateFloatNumbers from 'utils/validateFloatNumbers'
import { FLAVOR_TYPES_LINK, FLAVOR_TYPES_VIEW_TITLE } from '../constants'

const FlavorTypeForm = ({ breadcrumbName, formTitle, flavorTypeData, submitBtnText, isReading, onSubmit }) => {

    const createFlavorTypeModel = (flavorTypeData) => {
        return {
            name: flavorTypeData?.name || '',
            description: flavorTypeData?.description || '',
            price: flavorTypeData?.price || '',
        }
    };

    const initializeForm = () => {
        if (flavorTypeData) {
            return createFlavorTypeModel(flavorTypeData);
        }
        return createFlavorTypeModel();
    };

    const [formData, setFormData] = useState(initializeForm());

    // #region Handlers OnChange

    const handleNameChange = ({ target }) => {
        let newFormData = { ...formData };
        newFormData.name = target.value;
        setFormData(newFormData);
    };

    const handleDescriptionChange = ({ target }) => {
        let newFormData = { ...formData }
        newFormData.description = target.value
        setFormData(newFormData)
    };

    const handlePriceChange = ({ target }) => {
        let newFormData = { ...formData }
        newFormData.price = target.value
        setFormData(newFormData);
    };

    // #endregion

    // #region Validators

    const isPriceValid = (price) => {
        if (!(price)) {
            return false;
        }
        if (isNaN(price)) {
            return false;
        }
        return (price > 0 && price.toString().length <= 5);
    };

    const isFormNameValid = () => {
        return formData?.name?.trim();
    };

    const isFormPriceEmpty = () => {
        return (!(formData?.price));
    };

    const isFormPriceValid = () => {
        return isPriceValid(formData?.price);
    };

    const isFormDataValid = (warn) => {
        if (!(isFormNameValid())) {
            if (warn) {
                warnSweetAlert('Ingrese el nombre de la categoría.');
            }
            return false;
        }
        if (!(isFormPriceValid())) {
            if (warn) {
                if (isFormPriceEmpty()) {
                    warnSweetAlert('Ingrese el precio de la categoría.');
                } else {
                    warnSweetAlert('Ingrese el precio de la categoría correctamente.');
                }
            }
            return false;
        }
        return true;
    };

    // #endregion

    const formDataValid = isFormDataValid();

    // #region Form Controls Styles and Errors

    const defaultInputStyle = 'form-control';
    const validInputStyle = 'form-control is-valid';
    const invalidInputStyle = 'form-control is-invalid';

    const getNameStyleAndErr = () => {
        if (!formData.name || isReading) {
            return [defaultInputStyle, ''];
        };

        if (formData.name.trim()) {
            return [validInputStyle, ''];
        };

        return [invalidInputStyle, 'Ingrese un nombre válido'];
    }

    const getPriceStyleAndErr = () => {
        if (!formData.price || isReading) {
            return [defaultInputStyle, ''];
        };

        if (isPriceValid(formData.price)) {
            return [validInputStyle, ''];
        };

        return [invalidInputStyle, 'Ingrese un precio válido'];
    }

    const [nameInputStyle, nameInputErrorText] = getNameStyleAndErr();
    const [priceInputStyle, priceInputErrorText] = getPriceStyleAndErr();

    // #endregion

    // #region Action Buttons Config

    const goBackBtnConfig = {
        enable: isReading,
        link: FLAVOR_TYPES_LINK,
    }

    const handleSubmitBtnClicked = () => onSubmit(formData);
    const warnFormDataInvalid = () => isFormDataValid(true);

    const submitBtnConfig = {
        ready: formDataValid,
        onClickOk: handleSubmitBtnClicked,
        onClickNotOk: warnFormDataInvalid,
        label: submitBtnText,
        enable: !isReading,
    }

    const cancelBtnConfig = {
        enable: !isReading,
        link: FLAVOR_TYPES_LINK,
    }

    // #endregion

    return (
        <>
            <Breadcrumb
                currentName={breadcrumbName}
                icon={faIceCream}
                parentLink={FLAVOR_TYPES_LINK}
                parentName={FLAVOR_TYPES_VIEW_TITLE}
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
                            placeholder='Ingrese nombre de la categoría...'
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
                            placeholder={isReading ? "" : 'Ingrese descripción de la categoría...'}
                            disabled={isReading}
                            type='text'
                            value={formData.description}
                        >
                        </textarea>
                    </div>
                </div>
                <div className="formRow">
                    <div className="form-control-label">
                        <label >Precio por kilo ($)*</label>
                    </div>
                    <div className="form-control-input">
                        <input
                            className={priceInputStyle}
                            onChange={handlePriceChange}
                            onKeyDown={(e) => validateFloatNumbers(e)}
                            placeholder={isReading ? "" : "Ingrese precio de la categoría..."}
                            disabled={isReading}
                            type="number"
                            value={formData.price}
                        />
                        <div style={{ color: 'red', fontFamily: 'Abel', fontWeight: 'bold' }} >{priceInputErrorText}</div>
                    </div>
                </div>
                <ActionButtons
                    submit={submitBtnConfig}
                    cancel={cancelBtnConfig}
                    goBack={goBackBtnConfig}
                />
            </div>
        </>
    )
}

FlavorTypeForm.propTypes = {
    breadcrumbName: PropTypes.string.isRequired,
    formTitle: PropTypes.string.isRequired,
}

export default FlavorTypeForm