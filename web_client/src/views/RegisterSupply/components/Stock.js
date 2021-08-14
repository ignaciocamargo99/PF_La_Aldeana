import React, {useEffect, useRef, useState} from 'react';
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
        if (inputSupplyStockLot.current.value > 0 && inputSupplyStockLot.current.value <= 99999999) {
            setIsValidSupplyStockLotClass("form-control is-valid");
            props.updateLotSupply(Math.trunc(inputSupplyStockLot.current.value));

            if (inputSupplyStock.current.value <= inputSupplyStockLot.current.value * inputSupplyUnitsByLot.current.value || 
                inputSupplyStock.current.value > (Math.trunc(inputSupplyStockLot.current.value) + 1) * inputSupplyUnitsByLot.current.value ){
                props.updateUnitSupply(inputSupplyStockLot.current.value * inputSupplyUnitsByLot.current.value);
                inputSupplyStock.current.value = inputSupplyStockLot.current.value * inputSupplyUnitsByLot.current.value;
            }

        } else if (prevSupplyStockLot !== "null") {
            setIsValidSupplyStockLotClass("form-control is-invalid");
        }
    }, [props.lotSupply]);

    useEffect(() => {
        if (inputSupplyUnitsByLot.current.value > 0 && inputSupplyUnitsByLot.current.value <= 99999999) {
            setIsValidSupplyUnitsByLotClass("form-control is-valid");
            props.updateUnitPerLotSupply(Math.trunc(inputSupplyUnitsByLot.current.value));
            
            if (inputSupplyStock.current.value <= inputSupplyStockLot.current.value * inputSupplyUnitsByLot.current.value || 
                inputSupplyStock.current.value > (Math.trunc(inputSupplyStockLot.current.value) + 1) * inputSupplyUnitsByLot.current.value ){
                props.updateUnitSupply(inputSupplyStockLot.current.value * inputSupplyUnitsByLot.current.value);
                inputSupplyStock.current.value = inputSupplyStockLot.current.value * inputSupplyUnitsByLot.current.value;
            }

        } else if (prevSupplyUnitsByLot !== "null") {
            setIsValidSupplyUnitsByLotClass("form-control is-invalid");
        }
    }, [props.unitPerLotSupply]);

    useEffect(() => {
        if (inputSupplyStock.current.value >= inputSupplyStockLot.current.value * inputSupplyUnitsByLot.current.value 
            && inputSupplyStock.current.value < (Math.trunc(inputSupplyStockLot.current.value) + 1) * inputSupplyUnitsByLot.current.value ) {
            setIsValidSupplyStockClass("form-control is-valid");
            props.updateUnitSupply(Math.trunc(inputSupplyStock.current.value));
            setError('');

        } else if (prevSupplyStock !== "null") {
            setIsValidSupplyStockClass("form-control is-invalid");
            setError('El stock por unidad debe ser un número mayor o igual a ' + inputSupplyStockLot.current.value * inputSupplyUnitsByLot.current.value
            + ' y menor que ' + (Math.trunc(inputSupplyStockLot.current.value) + 1) * inputSupplyUnitsByLot.current.value);
        }
    }, [props.unitSupply]);

    return(
        <>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="lotStock">Stock lotes*</label>
                </div>
                <div className="form-control-input">
                    <input className={isValidSupplyStockLotClass} id="lotStock" ref={inputSupplyStockLot} onChange={handleSupplyStockLotChanged} type="number" min="0" placeholder="Ingrese stock de lotes..."
                    onKeyDown={(e) => validateFloatNumbers(e)}></input>
                </div>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="unitsPerLot">Cant. unidades por lote*</label>
                </div>
                <div className="form-control-input">
                    <input className={isValidSupplyUnitsByLotClass} id="unitsPerLot" ref={inputSupplyUnitsByLot} onChange={handleSupplyUnitsByLotChanged} type="number" min="0" placeholder="Ingrese cantidad de unidades por lote..."
                    onKeyDown={(e) => validateFloatNumbers(e)}></input>
                </div>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="supplyStock">Stock actual del insumo*</label>
                </div>
                <div className="form-control-input">
                    <input className={isValidSupplyStockClass} id="supplyStock" ref={inputSupplyStock} onChange={handleSupplyStockChanged} type="number" min="0" placeholder="Ingrese stock actual del insumo..."
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
        lotSupply: state.lotSupply
    }
}

const mapDispatchToProps = {
    updateUnitSupply,
    updateLotSupply,
    updateUnitPerLotSupply
}


export default connect(mapStateToProps, mapDispatchToProps)(Stock);