import React, { useEffect, useRef, useState } from 'react';
import { updateNameSupply } from '../../../actions/SupplyActions';
import { connect } from 'react-redux';
import BeShowed from 'common/BeShowed';

const NameSupply = (props) => {
    const inputSupplyName = useRef(null);
    const [prevSupplyName, setPrevSupplyName] = useState("null");
    const [isValidClass, setIsValidClass] = useState("form-control");

    const handleNameChange = () => {
        setPrevSupplyName(props.nameSupply);
        props.updateNameSupply(Math.trunc(inputSupplyName.current.value));
    }

    useEffect(() => {
        if (!props.data.reading) {
            const supplyName = inputSupplyName.current.value.trim();
            if (supplyName.length > 0 && supplyName.length <= 50) {
                setIsValidClass("form-control is-valid");
                props.updateNameSupply(supplyName);
            } else if (prevSupplyName !== "null") {
                setIsValidClass("form-control is-invalid");
                props.updateNameSupply('null');
            }
        }
    }, [prevSupplyName, props, props.nameSupply]);

    return (
        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="supplyName" >Nombre*</label>
            </div>
            <div className="form-control-input">
                <BeShowed show={!props.data.reading}>
                    <input className={isValidClass} id="supplyName" maxLength="50" required type="text" ref={inputSupplyName} onChange={handleNameChange} placeholder="Ingrese nombre del insumo..." autoFocus />
                </BeShowed>
                <BeShowed show={props.data.reading}>
                    <input className="form-control is-valid" id="supplyName" type="text" ref={inputSupplyName} value={props.data.name} readOnly />
                </BeShowed>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        nameSupply: state.nameSupply
    }
}

const mapDispatchToProps = {
    updateNameSupply
}


export default connect(mapStateToProps, mapDispatchToProps)(NameSupply);