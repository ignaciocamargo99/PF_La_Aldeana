import { faIceCream } from '@fortawesome/free-solid-svg-icons'
import Breadcrumb from 'common/Breadcrumb'
import React, { useState } from 'react'
import PropTypes from 'prop-types'

const FlavorTypeForm = ({ breadcrumbName, formTitle, flavorTypeData, isReading }) => {

    const createFlavorTypeModel = (flavorTypeData) => {
        return {
            name: flavorTypeData?.name || '',
            description: flavorTypeData?.description || '',
        }
    };

    const initializeForm = () => {
        if (flavorTypeData) {
            return createFlavorTypeModel(flavorTypeData);
        }
        return createFlavorTypeModel();
    };

    const [formData, setFormData] = useState(initializeForm());

    const defaultInputStyle = 'form-control';
    const validInputStyle = 'form-control is-valid';
    const invalidInputStyle = 'form-control is-invalid';

    const handleNameChange = ({ target }) => {
        let newFormData = { ...formData };
        newFormData.name = target.value;
        setFormData(newFormData);
    };

    const validateNameFormControl = () => {
        if (!formData.name) {
            return [defaultInputStyle, ''];
        };

        if (formData.name.trim()) {
            return [validInputStyle, ''];
        };

        return [invalidInputStyle, 'Ingrese un nombre válido'];
    }

    const [nameInputStyle, nameInputErrorText] = validateNameFormControl();

    return (
        <>
            <Breadcrumb
                currentName={breadcrumbName}
                icon={faIceCream}
                parentLink='/app/flavorTypes'
                parentName="Tipos de sabores"
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
                            placeholder='Ingrese nombre del tipo de sabor...'
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
                </div>
            </div>
        </>
    )
}

FlavorTypeForm.propTypes = {
    breadcrumbName: PropTypes.string.isRequired,
    formTitle: PropTypes.string.isRequired,
}

export default FlavorTypeForm