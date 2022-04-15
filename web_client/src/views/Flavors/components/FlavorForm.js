import { faIceCream } from '@fortawesome/free-solid-svg-icons'
import Breadcrumb from 'common/Breadcrumb'
import Buttons from 'common/Buttons'
import { useGetFlavorFamilies } from 'hooks/useGetFlavorFamilies'
import { useGetFlavorTypes } from 'hooks/useGetFlavorTypes'
import React, { useState } from 'react'
import validateFloatNumbers from 'utils/validateFloatNumbers'
import warnSweetAlert from 'utils/WarningMessages/warnSweetAlert'

const FlavorForm = ({ breadcrumbName, formTitle, flavorData, submitBtnText, onSubmit }) => {

    const { flavorTypes } = useGetFlavorTypes();
    const { flavorFamilies } = useGetFlavorFamilies();

    const initializeForm = () => {
        if (flavorData) {
            return createFlavorModel(flavorData)
        }
        return createFlavorModel()
    }

    const createFlavorModel = (flavorData) => {
        return {
            name: flavorData?.name || '',
            description: flavorData?.description || '',
            price: flavorData?.price || '',
            stock: flavorData?.stock || '',
            reorderStock: flavorData?.reorderStock || '',
            family_flavor: flavorData?.family_flavor || '',
            type_flavor: flavorData?.type_flavor || '',
        }
    }

    const [formData, setFormData] = useState(initializeForm());

    const isFormNameValid = () => {
        return formData?.name?.trim() !== '';
    }

    const isPriceValid = () => {
        if (!(formData?.price)) {
            return false;
        }
        if (isNaN(formData.price)) {
            return false;
        }
        return formData.price > 0;
    }

    const isStockValid = () => {
        if (!(formData?.stock)) {
            return false;
        }
        if (isNaN(formData.stock)) {
            return false;
        }
        return formData.stock > 0;
    }

    const isReorderStockValid = () => {
        if (formData?.reorderStock) {
            if (isNaN(formData.reorderStock)) {
                return false;
            }
            return formData.reorderStock >= 0;
        }
        return true;
    }

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

    const isTypeFlavorValid = () => {
        if (!(formData?.type_flavor)) {
            return false;
        }
        if (isNaN(formData.type_flavor)) {
            return false;
        }
        if (flavorTypes) {
            return flavorTypes.map((ft) => ft.id_type_flavor).includes(+formData.type_flavor);
        }
        return false;
    }

    const isFormDataValid = () => {
        if (!(isFormNameValid())) {
            return false;
        }
        if (!(isPriceValid())) {
            return false;
        }
        if (!(isStockValid())) {
            return false;
        }
        if (!(isReorderStockValid())) {
            return false;
        }
        if (!(isFamilyFlavorValid())) {
            return false;
        }
        if (!(isTypeFlavorValid())) {
            return false;
        }
        return true;
    }

    let formDataValid = isFormDataValid();

    const warnFormDataInvalid = () => {
        if (!(isFormNameValid())) {
            warnSweetAlert('Ingrese el nombre del sabor.');
            return;
        }
        if (!(isPriceValid())) {
            warnSweetAlert('Ingrese el precio del sabor.');
            return;
        }
        if (!(isStockValid())) {
            warnSweetAlert('Ingrese el stock del sabor.');
            return;
        }
        if (!(isReorderStockValid())) {
            warnSweetAlert('Stock de reorden inválido.');
            return;
        }
        if (!(isFamilyFlavorValid())) {
            warnSweetAlert('Ingrese la familia del sabor.');
            return;
        }
        if (!(isTypeFlavorValid())) {
            warnSweetAlert('Ingrese el tipo del sabor.')
            return;
        }
    }

    const handleNameChange = ({ target }) => {
        let newFormData = { ...formData }
        newFormData.name = target.value
        setFormData(newFormData)
    }

    const handleDescriptionChange = ({ target }) => {
        let newFormData = { ...formData }
        newFormData.description = target.value
        setFormData(newFormData)
    }

    const handlePriceChange = ({ target }) => {
        let newFormData = { ...formData }
        newFormData.price = target.value
        setFormData(newFormData)
    }

    const handleStockChange = ({ target }) => {
        let newFormData = { ...formData }
        newFormData.stock = target.value
        setFormData(newFormData)
    }

    const handleReorderStockChange = ({ target }) => {
        let newFormData = { ...formData }
        newFormData.reorderStock = target.value
        setFormData(newFormData)
    }

    const handleFlavorTypeChange = ({ target }) => {
        let newFormData = { ...formData }
        newFormData.type_flavor = target.value
        setFormData(newFormData)
    }

    const handleFlavorFamilyChange = ({ target }) => {
        let newFormData = { ...formData }
        newFormData.family_flavor = target.value
        setFormData(newFormData)
    }

    const handleCancelBtnClicked = () => {
        window.location.replace('/app/flavors');
    };

    const handleSubmitBtnClicked = () => {
        onSubmit(formData);
    };

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
                            className="form-control"
                            onChange={handleNameChange}
                            placeholder='Ingrese nombre del sabor...'
                            type='text'
                            value={formData.name}
                        >
                        </input>
                    </div>
                </div>
                <div className="formRow">
                    <div className="form-control-label">
                        <label className='col-3 lbTexttarea'>Descripción</label>
                    </div>
                    <div className="form-control-input">
                        <textarea
                            className="form-control"
                            onChange={handleDescriptionChange}
                            maxLength="150"
                            placeholder='Ingrese descripción del sabor...'
                            type='text'
                            value={formData.description}
                        >
                        </textarea>
                    </div>
                </div>
                <div className="formRow">
                    <div className="form-control-label">
                        <label >Precio*</label>
                    </div>
                    <div className="form-control-input">
                        <input
                            className="form-control"
                            onChange={handlePriceChange}
                            onKeyDown={(e) => validateFloatNumbers(e)}
                            placeholder="Ingrese precio del sabor..."
                            type="number"
                            value={formData.price}
                        />
                    </div>
                </div>
                <div className="formRow">
                    <div className="form-control-label">
                        <label >Stock actual*</label>
                    </div>
                    <div className="form-control-input">
                        <input
                            className="form-control"
                            onChange={handleStockChange}
                            onKeyDown={(e) => validateFloatNumbers(e)}
                            placeholder="Ingrese stock actual..."
                            type="number"
                            value={formData.stock}
                        />
                    </div>
                </div>
                <div className="formRow">
                    <div className="form-control-label">
                        <label >Stock de Reorden</label>
                    </div>
                    <div className="form-control-input">
                        <input
                            className="form-control"
                            onChange={handleReorderStockChange}
                            onKeyDown={(e) => validateFloatNumbers(e)}
                            placeholder="Ingrese stock de reorden..."
                            type="number"
                            value={formData.reorderStock}
                        />
                    </div>
                </div>
                <div className="formRow">
                    <div className="form-control-label">
                        <label >Familia*</label>
                    </div>
                    <div className="form-control-input">
                        <select className="form-control"
                            value={formData.family_flavor}
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
                        <label >Tipo*</label>
                    </div>
                    <div className="form-control-input">
                        <select className="form-control"
                            value={formData.type_flavor}
                            onChange={handleFlavorTypeChange}
                        >
                            <option disabled value=''>Seleccione tipo de sabor...</option>
                            {flavorTypes?.map((ft, i) => {
                                return (
                                    <option
                                        key={ft.id_type_flavor}
                                        value={ft.id_type_flavor}
                                    >
                                        {ft.name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <Buttons
                    actionCancel={handleCancelBtnClicked}
                    actionOK={handleSubmitBtnClicked}
                    actionNotOK={warnFormDataInvalid}
                    label={submitBtnText}
                    ready={formDataValid}
                />
            </div>
        </>
    )
}

export default FlavorForm