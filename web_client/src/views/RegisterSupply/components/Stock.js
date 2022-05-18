import React, { useEffect, useRef, useState } from 'react';
import validateFloatNumbers from '../../../utils/Validations/validateFloatNumbers';
import { updateUnitSupply, updateLotSupply, updateUnitPerLotSupply } from '../../../actions/SupplyActions';
import { connect } from 'react-redux';
import BeShowed from '../../../common/BeShowed';

const Stock = (props) => {

    const inputSupplyStockLot = useRef(null);
    const inputSupplyUnitsByLot = useRef(null);
    const inputSupplyStock = useRef(null);
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
    }

    const handleSupplyUnitsByLotChanged = () => {
        setPrevSupplyUnitsByLot(props.unitPerLotSupply);
        props.updateUnitPerLotSupply(inputSupplyUnitsByLot.current.value);
    }

    const handleSupplyStockChanged = () => {
        setPrevSupplyStock(props.unitSupply);
        props.updateUnitSupply(inputSupplyStock.current.value);
    }

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

            } else if (prevSupplyStockLot !== "null") {
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

            } else if (prevSupplyUnitsByLot !== "null") {
                setIsValidSupplyUnitsByLotClass("form-control is-invalid");
                props.updateUnitPerLotSupply(0);
            }
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
                        <input className={isValidSupplyStockLotClass} id="lotStock" ref={inputSupplyStockLot} onChange={handleSupplyStockLotChanged} type="number" min="1" placeholder="Ingrese stock de lotes..." defaultValue='0'
                            onKeyDown={(e) => validateFloatNumbers(e)}></input>
                    </div>
                </div>
                <div className="formRow">
                    <div className="form-control-label">
                        <label htmlFor="unitsPerLot">Cant. unidades por lote*</label>
                    </div>
                    <div className="form-control-input">
                        <input className={isValidSupplyUnitsByLotClass} id="unitsPerLot" ref={inputSupplyUnitsByLot} onChange={handleSupplyUnitsByLotChanged} type="number" min="1" placeholder="Ingrese cantidad de unidades por lote..." defaultValue='0'
                            onKeyDown={(e) => validateFloatNumbers(e)}></input>
                    </div>
                </div>
            </BeShowed>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="supplyStock">Stock actual en unidades del insumo*</label>
                </div>
                <div className="form-control-input">
                    <input className={isValidSupplyStockClass} id="supplyStock" ref={inputSupplyStock} onChange={handleSupplyStockChanged} type="number" min="1" placeholder="Ingrese stock actual del insumo..." defaultValue='0'
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