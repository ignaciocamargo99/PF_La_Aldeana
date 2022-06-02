import React, { useEffect, useRef, useState } from 'react';
import validateFloatNumbers from '../../../utils/Validations/validateFloatNumbers';
import { updateUnitSupply, updateLotSupply, updateUnitPerLotSupply } from '../../../actions/SupplyActions';
import { connect } from 'react-redux';
import BeShowed from '../../../common/BeShowed';

const Stock = (props) => {

    const inputSupplyStockLot = useRef(null);
    const inputSupplyUnitsByLot = useRef(null);
    const inputSupplyStock = useRef(null);
    const [supplyStockLot, setSupplyStockLot] = useState();
    const [supplyUnitsByLot, setSupplyUnitsByLot] = useState();
    const [supplyStock, setSupplyStock] = useState();
    const [prevSupplyStockLot, setPrevSupplyStockLot] = useState("null");
    const [prevSupplyUnitsByLot, setPrevSupplyUnitsByLot] = useState("null");
    const [prevSupplyStock, setPrevSupplyStock] = useState("null");
    const [isValidSupplyStockLotClass, setIsValidSupplyStockLotClass] = useState("form-control");
    const [isValidSupplyUnitsByLotClass, setIsValidSupplyUnitsByLotClass] = useState("form-control");
    const [isValidSupplyStockClass, setIsValidSupplyStockClass] = useState("form-control");
    const [error, setError] = useState('');

    const handleSupplyStockLotChanged = () => {
        setPrevSupplyStockLot(props.lotSupply);
        props.updateLotSupply(inputSupplyStockLot.current.value);
        if (props.data.editing) {
            props.data.stock_lot = inputSupplyStockLot.current.value;
            props.load(props.data)
        }
    }

    const handleSupplyUnitsByLotChanged = () => {
        setPrevSupplyUnitsByLot(props.unitPerLotSupply);
        props.updateUnitPerLotSupply(inputSupplyUnitsByLot.current.value);
        if (props.data.editing) {
            props.data.unit_x_lot = inputSupplyUnitsByLot.current.value;
            props.load(props.data)
        }
    }

    const handleSupplyStockChanged = () => {
        setPrevSupplyStock(props.unitSupply);
        props.updateUnitSupply(inputSupplyStock.current.value);
        if (props.data.editing) {
            props.data.stock_unit = inputSupplyStock.current.value;
            props.load(props.data)
        }
    }

    useEffect(() => {
        if (props.data.stock_lot) setSupplyStockLot(props.data.stock_lot);
        if (props.data.stock_unit) setSupplyStock(props.data.stock_unit);
        if (props.data.unit_x_lot) setSupplyUnitsByLot(props.data.unit_x_lot);
    }, [])

    useEffect(() => {
        if (props.typeSupply === 2) {
            if (inputSupplyStockLot.current.value > 0 && inputSupplyStockLot.current.value <= 9999) {
                setIsValidSupplyStockLotClass("form-control is-valid");
                props.updateLotSupply(Math.trunc(inputSupplyStockLot.current.value));

                if (inputSupplyStock.current.value <= inputSupplyStockLot.current.value * inputSupplyUnitsByLot.current.value ||
                    inputSupplyStock.current.value > (Math.trunc(inputSupplyStockLot.current.value) + 1) * inputSupplyUnitsByLot.current.value) {
                    props.updateUnitSupply(inputSupplyStockLot.current.value * inputSupplyUnitsByLot.current.value);
                    inputSupplyStock.current.value = inputSupplyStockLot.current.value * inputSupplyUnitsByLot.current.value;
                }
                props.data.stock_lot = inputSupplyStockLot.current.value;
                props.data.stock_unit = inputSupplyStock.current.value;
                props.data.unit_x_lot = inputSupplyUnitsByLot.current.value;
                props.load(props.data)
            }
            else if (prevSupplyStockLot !== "null") {
                setIsValidSupplyStockLotClass("form-control is-invalid");
                props.updateLotSupply(0);
            }
        }
    }, [props.lotSupply]);

    useEffect(() => {
        if (props.typeSupply === 2) {
            if (inputSupplyUnitsByLot.current.value > 0 && inputSupplyUnitsByLot.current.value <= 99999) {
                setIsValidSupplyUnitsByLotClass("form-control is-valid");
                props.updateUnitPerLotSupply(Math.trunc(inputSupplyUnitsByLot.current.value));

                if (inputSupplyStock.current.value <= inputSupplyStockLot.current.value * inputSupplyUnitsByLot.current.value ||
                    inputSupplyStock.current.value > (Math.trunc(inputSupplyStockLot.current.value) + 1) * inputSupplyUnitsByLot.current.value) {
                    props.updateUnitSupply(inputSupplyStockLot.current.value * inputSupplyUnitsByLot.current.value);
                    inputSupplyStock.current.value = inputSupplyStockLot.current.value * inputSupplyUnitsByLot.current.value;
                }
                props.data.stock_lot = inputSupplyStockLot.current.value;
                props.data.stock_unit = inputSupplyStock.current.value;
                props.data.unit_x_lot = inputSupplyUnitsByLot.current.value;
                props.load(props.data)
            }
            else if (prevSupplyUnitsByLot !== "null") {
                setIsValidSupplyUnitsByLotClass("form-control is-invalid");
                props.updateUnitPerLotSupply(0);
            }
            // props.data.stock_lot = inputSupplyStockLot.current.value;
            // props.data.stock_unit = inputSupplyStock.current.value;
            // props.data.unit_x_lot = inputSupplyUnitsByLot.current.value;
            // props.load(props.data);
        }
    }, [props.unitPerLotSupply]);

    useEffect(() => {
        if (props.typeSupply === 2) {
            if (inputSupplyStock.current.value >= inputSupplyStockLot.current.value * inputSupplyUnitsByLot.current.value
                && inputSupplyStock.current.value < (Math.trunc(inputSupplyStockLot.current.value) + 1) * inputSupplyUnitsByLot.current.value) {
                setIsValidSupplyStockClass("form-control is-valid");
                props.updateUnitSupply(Math.trunc(inputSupplyStock.current.value));
                setError('');

            } else if (prevSupplyStock !== "null") {
                setIsValidSupplyStockClass("form-control is-invalid");
                props.updateUnitSupply(0);
                setError('El stock por unidad debe ser un número mayor o igual a ' + inputSupplyStockLot.current.value * inputSupplyUnitsByLot.current.value
                    + ' y menor que ' + (Math.trunc(inputSupplyStockLot.current.value) + 1) * inputSupplyUnitsByLot.current.value);
            }
        } else {
            if (inputSupplyStock.current.value > 0
                && inputSupplyStock.current.value <= 9999999) {
                setIsValidSupplyStockClass("form-control is-valid");
                props.updateUnitSupply(Math.trunc(inputSupplyStock.current.value));
                setError('');

            } else if (prevSupplyStock !== "null") {
                setIsValidSupplyStockClass("form-control is-invalid");
                props.updateUnitSupply(0);
                setError('El stock por unidad debe ser un número mayor a ' + 0 + ' y menor que ' + 10000000);
            }
            // props.data.stock_lot = inputSupplyStockLot.current.value;
            // props.data.stock_unit = inputSupplyStock.current.value;
            // props.data.unit_x_lot = inputSupplyUnitsByLot.current.value;
            // props.load(props.data);
        }
    }, [props.unitSupply]);

    useEffect(() => {
        setIsValidSupplyStockClass("form-control");
        setIsValidSupplyUnitsByLotClass("form-control");
        setIsValidSupplyStockLotClass("form-control");
    }, [props.typeSupply])

    return (
        <>
            <BeShowed show={props.typeSupply !== 1}>
                <div className="formRow">
                    <div className="form-control-label">
                        <label htmlFor="lotStock">Stock lotes*</label>
                    </div>
                    <div className="form-control-input">
                        <input className={supplyStockLot ? "form-control is-valid" : isValidSupplyStockLotClass} id="lotStock" ref={inputSupplyStockLot}
                            onChange={handleSupplyStockLotChanged} type="number" min="1"
                            placeholder="Ingrese stock de lotes..." defaultValue={supplyStockLot}
                            onKeyDown={(e) => validateFloatNumbers(e)}></input>
                    </div>
                </div>
                <div className="formRow">
                    <div className="form-control-label">
                        <label htmlFor="unitsPerLot">Cant. unidades por lote*</label>
                    </div>
                    <div className="form-control-input">
                        <input className={supplyUnitsByLot ? "form-control is-valid" : isValidSupplyUnitsByLotClass} id="unitsPerLot" ref={inputSupplyUnitsByLot}
                            onChange={handleSupplyUnitsByLotChanged} type="number" min="1"
                            placeholder="Ingrese cantidad de unidades por lote..." defaultValue={supplyUnitsByLot}
                            onKeyDown={(e) => validateFloatNumbers(e)}></input>
                    </div>
                </div>
            </BeShowed>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="supplyStock">Stock actual en unidades del insumo*</label>
                </div>
                <div className="form-control-input">
                    <input className={supplyStock ? "form-control is-valid" : isValidSupplyStockClass} id="supplyStock" ref={inputSupplyStock}
                        onChange={handleSupplyStockChanged} type="number" min="1"
                        placeholder="Ingrese stock actual del insumo..." defaultValue={supplyStock}
                        onKeyDown={(e) => validateFloatNumbers(e)}></input>
                </div>
            </div>
            <BeShowed show={error !== ''}>
                <div style={{ color: 'red', fontFamily: 'Abel', fontWeight: 'bold' }}>{error} </div>
            </BeShowed>
        </>
    )
}

const mapStateToProps = state => {
    return {
        unitPerLotSupply: state.unitPerLotSupply,
        unitSupply: state.unitSupply,
        typeSupply: state.typeSupply,
        lotSupply: state.lotSupply
    }
}

const mapDispatchToProps = {
    updateUnitSupply,
    updateLotSupply,
    updateUnitPerLotSupply
}


export default connect(mapStateToProps, mapDispatchToProps)(Stock);