import './styles/PriceType.css';
import Buttons from '../../common/Buttons';
import useHTTPGet from '../../hooks/useHTTPGet';
import { useRef, useEffect, useState } from 'react';
import Axios from 'axios';
import success from '../../utils/SuccessMessages/successTypeProduct';
import displayError from '../../utils/ErrorMessages/errorMessage';

const PORT = require('../../config');

const RegisterSupplyView = () => {

    const typeSupplies = useHTTPGet(PORT() + '/api/typeSupplies');

    // const [nameSupply, setNameSupply] = useState('');
    const inputSupplyName = useRef('');
    const handleNameChange = (event) => {
        // setNameSupply(inputSupplyName.current.value);
    };

    // const [supplyDescription, setSupplyDescription] = useState('');
    const inputSupplyDescription = useRef('');
    const handleDescriptionChange = (event) => {
        // setSupplyDescription(inputSupplyDescription.current.value);
    };

    // const [supplyTypeId, setSupplyTypeId] = useState(-1);
    const selectSupplyDescription = useRef('');
    const handleSupplyTypeChange = (event) => {
        // setSupplyTypeId(selectSupplyDescription.current.value);
    };

    const inputSupplySinglePrice = useRef('');
    const inputSupplyMultiplePrice = useRef('');
    const inputSupplyStockLot = useRef('');
    const inputSupplyUnitsByLot = useRef('');
    const inputSupplyStock = useRef('');

    // handleSubmit
    const registerSupply = () => {

        const name = inputSupplyName.current.value;
        const description = inputSupplyDescription.current.value;
        const id_supply_type = selectSupplyDescription.current.value;
        const price_wholesale = inputSupplyMultiplePrice.current.value;
        const price_retail = inputSupplySinglePrice.current.value;
        const stock_lot = inputSupplyStockLot.current.value;
        const unit_x_lot = inputSupplyUnitsByLot.current.value;
        const stock_unit = inputSupplyStock.current.value;

        const data = {
            name: name,
            description: description,
            id_supply_type: id_supply_type,
            price_wholesale: price_wholesale,
            price_retail: price_retail,
            stock_lot: stock_lot,
            stock_unit: stock_unit,
            unit_x_lot: unit_x_lot
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
            .catch(error => console.log(error))
    };

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
                        <input className="form-control" id="supplyName" type="text" ref={inputSupplyName} onChange={handleNameChange} placeholder="Ingrese nombre del insumo...">
                        </input>
                    </div>
                </div>
                <div className="formRow">
                    <div className="form-control-label">
                        <label htmlFor="supplyDescription">Descripción*</label>
                    </div>
                    <div className="form-control-input">
                        <textarea className="form-control" id="supplyDescription" ref={inputSupplyDescription} onChange={handleDescriptionChange} placeholder="Ingrese descripción del insumo..." rows="3"></textarea>
                    </div>
                </div>
                <div className="price-form-body ">
                    <div className="price-title">
                        <label >Precio*</label>
                    </div>
                    <div className="price-container">
                        <div className="price-type-container">
                            <label htmlFor="supplySinglePrice" className="price-type-label price-label">Minorista*</label>
                            <input id="supplySinglePrice" ref={inputSupplySinglePrice} className="form-control" type="number" min="0" placeholder="Ingrese precio por menor..." />
                        </div>
                        <div className="price-type-container">
                            <label htmlFor="supplyMultiplePrice" className="price-type-label price-label">Mayorista*</label>
                            <input id="supplyMultiplePrice" ref={inputSupplyMultiplePrice} className="form-control" type="number" min="0" placeholder="Ingrese precio por mayor..." />
                        </div>
                    </div>
                </div>
                <div className="formRow">
                    <div className="form-control-label">
                        <label htmlFor="supplyType">Tipo*</label>
                    </div>
                    <div className="form-control-input">
                        <select className="form-control" id="supplyType" defaultValue="-1" ref={selectSupplyDescription} onChange={handleSupplyTypeChange}>
                            <option disabled value="-1">Seleccione tipo de insumo...</option>
                            {
                                typeSupplies?.map((ts, i) => (
                                    <option key={i} value={ts.id_supply_type}>{ts.name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="formRow">
                    <div className="form-control-label">
                        <label htmlFor="lotStock">Stock lotes*</label>
                    </div>
                    <div className="form-control-input">
                        <input className="form-control" id="lotStock" ref={inputSupplyStockLot} type="number" min="0" placeholder="Ingrese stock de lotes..." />
                    </div>
                </div>
                <div className="formRow">
                    <div className="form-control-label">
                        <label htmlFor="unitsPerLot">Cant. unidades por lote*</label>
                    </div>
                    <div className="form-control-input">
                        <input className="form-control" id="unitsPerLot" ref={inputSupplyUnitsByLot} type="number" min="0" placeholder="Ingrese cantidad de unidades por lote..." />
                    </div>
                </div>
                <div className="formRow">
                    <div className="form-control-label">
                        <label htmlFor="supplyStock">Stock actual del insumo*</label>
                    </div>
                    <div className="form-control-input">
                        <input className="form-control" id="supplyStock" ref={inputSupplyStock} type="number" min="0" placeholder="Ingrese stock actual del insumo..." />
                    </div>
                </div>
                <Buttons label='Registrar' ready={true} actionOK={registerSupply} />
            </div>
        </>
    )
}

export default RegisterSupplyView;