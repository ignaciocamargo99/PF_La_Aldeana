import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { updateUnitSupply } from '../../../actions/SupplyActions';
import BeShowed from '../../../common/BeShowed';
import validateFloatNumbers from '../../../utils/Validations/validateFloatNumbers';

const Stock = (props) => {
    const inputSupplyStock = useRef(null);
    const [supplyStock, setSupplyStock] = useState();
    const [prevSupplyStock, setPrevSupplyStock] = useState("null");
    const [isValidSupplyStockClass, setIsValidSupplyStockClass] = useState("form-control");
    const [error, setError] = useState('');

    const handleSupplyStockChanged = () => {
        setPrevSupplyStock(props.unitSupply);
        props.updateUnitSupply(inputSupplyStock.current.value);
        if (props.data.editing) {
            props.data.stock_unit = inputSupplyStock.current.value;
            props.load(props.data)
        }
    }

    useEffect(() => {
        if (props.data.stock_unit) setSupplyStock(props.data.stock_unit);
    }, [])

    useEffect(() => {
        if (inputSupplyStock.current.value > 0
            && inputSupplyStock.current.value <= 9999999999) {
            setIsValidSupplyStockClass("form-control is-valid");
            props.updateUnitSupply(Math.trunc(inputSupplyStock.current.value));
            setError('');

        } else if (prevSupplyStock !== "null") {
            setIsValidSupplyStockClass("form-control is-invalid");
            props.updateUnitSupply(0);
            setError('');
        }
    }, [props.unitSupply]);

    useEffect(() => setIsValidSupplyStockClass("form-control"), [props.typeSupply])

    const validateStockUnit = (e) => {
        if (e.target.value.length > 10) e.target.value = e.target.value.slice(0, 10);
    }

    return (
        <>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="supplyStock">Stock actual en unidades*</label>
                </div>
                <div className="form-control-input">
                    <input className={props.data.stock_unit ? "form-control is-valid" : isValidSupplyStockClass} id="supplyStock" ref={inputSupplyStock}
                        onChange={handleSupplyStockChanged} type="number" min="1"
                        placeholder="Ingrese stock actual del insumo..." defaultValue={props.data.stock_unit}
                        onKeyDown={(e) => validateFloatNumbers(e)} onInput={(e) => validateStockUnit(e)}></input>
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
        unitSupply: state.unitSupply,
        typeSupply: state.typeSupply,
    }
}

const mapDispatchToProps = {
    updateUnitSupply,
}


export default connect(mapStateToProps, mapDispatchToProps)(Stock);